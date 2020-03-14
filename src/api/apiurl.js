/*
 * @Date: 2019-12-27 15:49:55
 * @LastEditors  : wangbingqi
 * @LastEditTime : 2020-01-19 11:33:03
 */
// let baseUrl = 'http://localhost:8001';
// let baseUrl = 'http://localhost:7001/admin';

let baseUrl = 'http://192.168.1.11:7001';

export default {
  //public
  u_login: baseUrl.concat('/login'),
  u_del: baseUrl.concat('/del'),

  //taglist
  u_taglist: baseUrl.concat('/tagList'),
}