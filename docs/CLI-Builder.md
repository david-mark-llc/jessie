# Command Line Builder

If you have read the user guides you should have a good idea how Jessie is designed, and therefore, how the builder needs to work.

The builder needs to be given a list of functions. Each function must specify which rendition to use. The builder will tell you if you're missing any dependencies. Then it will build you specified Jessie.

## Options

Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -o, --output [file]  The file to output to (outputs to stdout by default)
    --minify             Minify the output using UglifyJS
    --namespace [name]   The name of the global variable to export

Examples:

    // e.g. Linux
    node command.js -o /path/to/jessie.js bind:1 attachListener:2

    // e.g. windows
    node command.js getEventTarget:1 attachListener:2 > /path/to/jessie.js