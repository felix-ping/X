'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"https://www.easy-mock.com/mock/5bc097f89944a90dbdbe6736/api"',
  //  BASE_API: '"https://apiv1testsystem.chaoduotu.com"', // dev
  BASE_API: '"http://192.168.5.121:8081"',
});
