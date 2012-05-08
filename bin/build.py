import os
import os.path
import re
import sys
import topsort
import datetime


# the variables that are declared in the header file
HEADER_DECLARATIONS = ["global", "globalDocument", "html", "canCall", "isHostObjectProperty", "isHostMethod"]
EXPORTS = ["isHostObjectProperty", "isHostMethod"]

GLOBAL_DIRECTIVE = "\/\*global\s(.*)\s+?\*\/"


class Rendition(object):
    def __init__(self, function, filename):
        self.function = function
        self.filename = filename
        self._dependencies = None
        self._contents = None

    @property
    def dependencies(self):
        if self._dependencies is None:
            self._dependencies = set()
            for match in re.findall(GLOBAL_DIRECTIVE, self.contents):
                for dependency in match.split(","):
                    dependency = dependency.split(":")[0]
                    if dependency != self.function.name:
                        self._dependencies.add(dependency)

        return self._dependencies

    @property
    def contents(self):
        if self._contents is None:
            with open(self.filename) as f:
                self._contents = "".join(f.readlines())

        return self.comment + self._contents

    def get_contents(self, conditional=False, remove_directives=True):
        contents = [re.sub(GLOBAL_DIRECTIVE, "", self.contents)]
        if conditional:
            contents.insert(0, "if(!%s){" % self.function.name)
            contents.append("}")

        return "\n".join(contents)

    @property
    def comment(self):
        return "// ============ %s ==============\n" % self.filename


class Function(object):
    def __init__(self, folder):
        # filename should be an absolute path
        self.folder = folder
        self.name = os.path.basename(folder)
        #print "new Function(" + self.name + ")"
        self.renditions = [Rendition(self, os.path.join(self.folder, f))
            for f in os.listdir(self.folder) if f.endswith(".js")]

    def get_dependencies(self, renditions):
        """"""
        dependencies = set()

        # default to all renditions
        if not renditions:
            renditions = range(1, len(self.renditions) + 1)

        # go through all requested renditions and add their dependencies
        for r in renditions:
            dependencies.update(self.renditions[r - 1].dependencies)

        return dependencies

    def get_contents(self, renditions):
        contents = []
        # default to all renditions
        if not renditions:
            renditions = range(1, len(self.renditions) + 1)
        else:
            # copy the list
            renditions = list(renditions)

        # add the first required rendition without a conditional around it
        contents.append(self.renditions[renditions.pop(0) - 1].get_contents(False))

        # go through all the rest of the renditions
        for r in renditions:
            contents.append(self.renditions[r - 1].get_contents(True))

        return self.comments + "\n".join(contents)

    @property
    def comments(self):
        """Creates a JavaScript comment to be inserted into the built file"""
        return """
/****************************************************************
 *
 * %s
 *
 ****************************************************************/
 """ % self.name

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Function: %s>" % self.name


def sort_dependencies(functions, dependencies):
    """Topological sort of dependencies"""

    pairs = []
    for d, renditions in dependencies.iteritems():
        f = functions[d]
        for dep in f.get_dependencies(renditions):
            pairs.append((d, dep))

    order = topsort.topsort(pairs)
    order.reverse()
    return order


def load_functions(root):
    functions = {}
    # step through the functions folder
    for f in os.listdir(root):
        # functions are defined by their folder name
        f = os.path.join(root, f)
        if os.path.isdir(f):
            func = Function(f)
            functions[func.name] = func
    return functions


def expand_dependencies(glob, functions, required):
    """Expands the set of required dependencies so that it includes
    the full dependency graph"""
    deps = set(required.keys())
    while deps:
        # get the next dependency function, and the specified renditions
        dep = deps.pop()
        f = functions[dep]
        renditions = required[dep]
        for d in f.get_dependencies(renditions):
            if d not in required and d not in deps and d not in glob:
                if len(functions[d].renditions) > 1:
                    raise Exception("%s is an implied dependency, but requires the rendition to be specified!" % d)
                required[d] = ()
                deps.add(d)


def main():
    all_functions = load_functions("../functions/")

    if len(sys.argv) == 1:
        print "Available functions:"
        print all_functions.keys()
        return

    # create a map of function name to renditions numbers
    required_functions = {}
    for f in sys.argv[1:]:
        f = f.split(":")
        required_functions[f[0]] = () if len(f) == 1 else tuple(map(int, f[1:]))

    # ex
    expand_dependencies(HEADER_DECLARATIONS, all_functions, required_functions)

    # work out what order we need to export the functions in
    order = sort_dependencies(all_functions, required_functions)

    # remove header declarations
    order = [f for f in order if f not in HEADER_DECLARATIONS]

    print "The functions will be included in the following order:"
    print ", ".join(order)

    with open("../libraries/header1.inc") as f:
        header = f.readlines()

    with open("../libraries/footer1.inc") as f:
        footer = f.readlines()

    now = datetime.datetime.now()
    output_filename = "../builds/jessie.%s.js" % now.strftime("%Y%m%d%H%M%S")
    global_variable = "jessie"

    with open(output_filename, "w") as output:
        for line in header:
            output.write(line)

        # create the var declaration at the top of the file
        output.write("var " + ",".join(order) + ";\n")

        for func_name in order:
            f = all_functions[func_name]
            js = f.get_contents(required_functions[func_name])
            output.write(js)

        output.write("\nglobal[\"%s\"] = {%s};" % (
            global_variable,
            ",".join(["\"%s\": %s" % (f, f) for f in order + EXPORTS])
        ))

        for line in footer:
            output.write(line)

    print "output to:", output_filename

if __name__ == '__main__':
    main()
