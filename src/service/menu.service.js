const connection = require("../app/database");
const CommonService = require("./common.service");

class MenuService extends CommonService { 
  constructor() {
    super("menu");
  }
  async getMenuItemNameByUrl(url) {
    const statement = `SELECT name FROM menu WHERE url = ?`;
    const [ result ]  = await connection.execute(statement, [url]);
    return result[0];
  }
  async getMenuListAll() {
    const statement = `SELECT * FROM menu`;
    const [ result ]  = await connection.execute(statement, []);
    return result;
  }
  async getMenuListAllCount() {
    const statement = `SELECT * FROM menu`;
    const [ result ]  = await connection.execute(statement, []);
    return {
      count: 0,
      list: result
    };
  }
}
module.exports = new MenuService();