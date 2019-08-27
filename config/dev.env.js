'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ADMIN: '"https://vue-course-api.hexschool.io/api/jennyshih/admin"',
  API_LOGIN: '"https://vue-course-api.hexschool.io/admin/signin"',
  API_LOGOUT: '"https://vue-course-api.hexschool.io/logout"',
})
