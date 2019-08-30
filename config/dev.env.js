'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ADMIN: '"https://vue-course-api.hexschool.io/api/jennyshih/admin"',
  API_LOGIN: '"https://vue-course-api.hexschool.io/admin/signin"',
  API_LOGOUT: '"https://vue-course-api.hexschool.io/logout"',
  API_CHECKAUTH: '"https://vue-course-api.hexschool.io/api/user/check"',
  API_GETPRODUCTS: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/products"',
  API_PRODUCT: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/product"',
  API_USERPRODUCT: '"https://vue-course-api.hexschool.io/api/jennyshih/product"',
  API_FILEUPLOAD: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/upload"',
  API_GETORDERS: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/orders"',
  API_GETCOUPONS: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/coupons"',
  API_COUPON: '"https://vue-course-api.hexschool.io/api/jennyshih/admin/coupon"',
  API_USERCART: '"https://vue-course-api.hexschool.io/api/jennyshih/cart"',
})
