module.exports = {
  distDir: '../../dist/functions/next',
  webpack: (config, options) => {
    const { dev, isServer, buildId, dir } = options
    config.module.rules.push(
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: dir,
            exclude: /node_modules/,
            use: [{
              loader: 'ts-loader'
            }]
          }
        ]
      }
    )
    return config;
  }
}