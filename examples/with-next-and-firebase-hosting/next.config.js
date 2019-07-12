const path = require('path');
const targetDir = path.join(__dirname, 'src/app');
const tsLoader = {
	oneOf: [
		{
			test: /\.(js|mjs|jsx|ts|tsx)$/,
			include: [
				targetDir,
				"/next-server[\\\/]dist[\\\/]lib/",
				"/next[\\\/]dist[\\\/]client/",
				"/next[\\\/]dist[\\\/]pages/",
				"/[\\\/](strip-ansi|ansi-regex)[\\\/]/"
			],
			use: [{
				loader: 'ts-loader'
			}]
		}
	]
}
module.exports = {
	webpack: (config) => {
		config.module.rules.push(tsLoader)
		return config;
	}
}
