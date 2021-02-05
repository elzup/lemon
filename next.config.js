/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-require-imports */

const webpack = require('webpack')
const withPWA = require('next-pwa')

require('dotenv').config()

const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: prod ? false : true,
    dest: 'public',
  },
  webpack: (config) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  },
})
