import os
import os.path
import re
import sys


global_re = re.compile("\/\*global\s(.*)\s+?\*\/")

# the variables that are declared in the header file
HEADER_DECLARATIONS = ["html", "canCall"]


class Rendition(object):
    def __init__(self, function, filename):
        self.function = function
        self.filename = filename
        #print "new Rendition: ", filename
        self.dependencies = set()
        self.get_dependencies()
        #print "\tdependencies: " + ", ".join(self.dependencies)

    def get_dependencies(self):
        with open(self.filename) as f:
            for line in f:
                m = global_re.match(line)
                if m:
                    for dependency in m.groups()[0].split(","):
                        dependency = dependency.split(":")[0]
                        if dependency != self.function.name:
                            self.dependencies.add(dependency)


class Function(object):
    def __init__(self, folder):
        # filename should be an absolute path
        self.folder = folder
        self.name = os.path.basename(folder)
        #print "new Function(" + self.name + ")"
        self.renditions = [Rendition(self, os.path.join(self.folder, f))
            for f in os.listdir(self.folder) if f.endswith(".js")]

    @property
    def dependencies(self):
        return reduce(lambda x, y: x | y.dependencies, self.renditions, set())

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Function: %s>" % self.name


import topsort


def sort_dependencies(data):
    """Topological sort of dependencies"""

    pairs = []
    for k, v in data.iteritems():
        for d in v.dependencies:
            pairs.append((k, d))

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
        f = functions[deps.pop()]
        for d in f.dependencies:
            if d not in required and d not in deps and d not in glob:
                required[d] = functions[d]
                deps.add(d)


def main():
    all_functions = load_functions("../functions/")

    if len(sys.argv) == 1:
        print "Available functions:"
        print all_functions.keys()
        return

    required_functions = dict([(f, all_functions[f]) for f in sys.argv[1:]])
    expand_dependencies(HEADER_DECLARATIONS, all_functions, required_functions)

    order = sort_dependencies(required_functions)
    # remove header declarations
    order = [f for f in order if f not in HEADER_DECLARATIONS]

    print "The functions will be included in the following order:"
    print ", ".join(order)

if __name__ == '__main__':
    main()
