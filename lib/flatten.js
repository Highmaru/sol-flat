const fs = require('fs')
const path = require('path')
require('./func')

function flatten(inp, outp) {
	let ret = []

	function getImports(c) {
		const regImport = /import ['"]?([^'"]*)/g
		let imports
		let ret = []
		do {
			imports = regImport.exec(c)
			if (imports) {
				ret.push(imports[1])
			}
		} while (imports)
		return ret
	}

	function load_sol(fpath) {
		let content = fs.readFileSync(fpath, 'utf8')
		const imports = getImports(content)
		const parentPath = path.parse(fpath).dir

		if (imports.length > 0) {
			imports.forEach((f) => {
				if (f.indexOf('./') >= 0)
					(load_sol(parentPath + '/' + f))
				else
					(load_sol('./node_modules/' + f))
			})
		}
		ret.pushUnique(path.normalize(fpath))
	}

	load_sol(inp)
	for (let i = 0; i < ret.length; i++) {
		let f = ret[i]
		let rd = fs.readFileSync(f, 'utf8')
		if (i > 0) {
			rd = rd.replaceAll('pragma', '//pragma')
			rd = rd.replaceAll('import', '//import')
			fs.appendFileSync(outp, rd, 'utf8')
		} else {
			fs.writeFileSync(outp, rd, 'utf8')
		}
	}
}

module.exports = flatten