const connection = require("../app/database");
const CommonService = require("./common.service");

class RoleService extends CommonService {
  constructor() {
    super("role");
  } 
  async getRoleList(queryInfo) {
    const statement = `
      SELECT r.id, r.name, r.intro, r.createAt, r.updateAt, JSON_ARRAYAGG(a.menuId) menuList
      FROM role r
      LEFT JOIN authority a
      ON r.id = a.roleId
      GROUP BY r.id
      LIMIT ?, ?
    `
    const { offset, size } = queryInfo;
    const statement1 = `SELECT COUNT(*) as totalCount FROM role`;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1);
    const [ list ] = await connection.execute(statement, [offset + "", size + ""]);
    return {
      list,
      totalCount
    };
  }
  async searchRoleList(keyword, queryInfo) {
    const statement = `
      SELECT r.id, r.name, r.intro, r.createAt, r.updateAt, JSON_ARRAYAGG(a.menuId) menuList
      FROM role r
      LEFT JOIN authority a
      ON r.id = a.roleId
      WHERE CONCAT_WS("", r.id, r.name, r.intro) LIKE ?
      GROUP BY r.id
      LIMIT ?, ?
    `
    const { offset, size } = queryInfo;
    const [ list ] = await connection.execute(statement, [`%${keyword}%`, offset + "", size + ""]);
    const statement1 = `
      SELECT COUNT(*) as totalCount 
      FROM role 
      WHERE CONCAT_WS("", id, name, intro) LIKE ?`;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [`%${keyword}%`]);
    return {
      list,
      totalCount
    };
  }
}

module.exports = new RoleService();