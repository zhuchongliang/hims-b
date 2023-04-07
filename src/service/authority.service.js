const connection = require("../app/database");
const CommonService = require("./common.service");

class AuthorityService extends CommonService {
  constructor() {
    super("authority");
  } 
  async getMenuList(id) {
    const statement = `
      SELECT a.roleId, JSON_ARRAYAGG(
        JSON_OBJECT(
          "id", m.id, 
          "type", m.type, 
          "parentId", m.parentId, 
          "name", m.name, 
          "url",m.url
        )
      ) menuList
      FROM authority a
      JOIN menu m
      ON a.menuId = m.id
      WHERE a.roleId = ?`
    const [ result ] = await connection.execute(statement, [id]);
    return result;
  }
  async createRoleAuthority(roleId, menuList) {
    let res = [];
    menuList.forEach(menuId => {
      res.push({
        roleId,
        menuId
      });
    })
    const result = await this.createTableItem(res);
    return result;
  }
  async deleteRoleAuthority(roleId) {
    const placeHolder = new Array(roleId.length).fill("?").toString();
    const statement = `DELETE FROM authority WHERE roleId IN (${placeHolder})`
    const [ result ] = await connection.execute(statement, [...roleId]);
    return result;
  }
}

module.exports = new AuthorityService();