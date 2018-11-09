// let argv = process.argv
// let argc = (argv.length > 2) ? argv.length - 2 : 0

// console.log(argv, argc)
var ArgParser = require('argparse').ArgumentParser
var pkg = require('./package.json')
var parser = new ArgParser({
	version: pkg.version,
	addHelp: true,
	description: 'Solidity flattener'
})

parser.addArgument(
	['-o', '--output'], {
		help: 'output file'
	}
)

parser.addArgument(
	['-m', '--module'], {
		help: 'module path, default: node_module'
	}
)

var args = parser.parseArgs(process.argv)
console.log(args)