const connection = require("../app/database")

class CommonService {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async getTableList(offset, size) {
    const statement = `SELECT * FROM ${this.tableName} LIMIT ?, ?`
    const statement1 = `SELECT COUNT(*) as totalCount FROM ${this.tableName}`;
    const  [ list ] = await connection.execute(statement, [ offset + "", size + ""]);
    const [ [ { totalCount }  ] ] = await connection.execute(statement1);
    return {
      list,
      totalCount
    };
  }
  async deleteTableItem(id) {
    const statement = `DELETE FROM ${this.tableName} WHERE id = ?`
    const [ result ] = await connection.execute(statement, [ id ]);
    return result;
  }
  async deleteTableList(idList) {
    const placeHolder = new Array(idList.length).fill("?").toString();
    const statement = `DELETE FROM ${this.tableName} WHERE id IN (${placeHolder})`;
    const [ result ] = await connection.execute(statement, [...idList])
    return result;
  }
  async searchTableList(fieldList, keyword, offset, size) {
    const statement = `
      SELECT * 
      FROM ${this.tableName} 
      WHERE CONCAT_WS("",${fieldList.toString()}) LIKE ? LIMIT ?, ?;`
    const [ list ] = await connection.execute(statement, [ `%${keyword}%`, offset + "", size + "" ]);
    const statement1 = `
      SELECT COUNT(*) as totalCount 
      FROM ${this.tableName} 
      WHERE CONCAT_WS("",${fieldList.toString()})
      LIKE ?
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ `%${keyword}%` ]);
    return {
      list,
      totalCount
    };
  }
  async createTableItem(itemInfo) {
    let values = [];
    let placeHolder = "";
    let fieldList = [];
    if (Array.isArray(itemInfo)) {
      fieldList = Object.keys(itemInfo[0]);
      placeHolder = new Array(itemInfo.length)
      .fill(`(${new Array(fieldList.length).fill("?").toString()})`)
      .toString();
      values = itemInfo.map(v => Object.values(v)).flat();
    } else {
      fieldList = Object.keys(itemInfo);
      placeHolder = `(${new Array(fieldList.length).fill("?").toString()})`;
      values = Object.values(itemInfo);
    }
    const statement = `
      INSERT INTO ${this.tableName} 
      (${fieldList.toString()}) 
      VALUES ${placeHolder}
    `;
    const [ result ] = await connection.execute(statement, [...values]);
    return result;
  }
  async updateTableItem(id, itemInfo) {
    const placeHolder = Object.keys(itemInfo).map(v => `${v}=?`);
    const statement = `UPDATE ${this.tableName} SET ${placeHolder.toString()} WHERE id = ?`;
    const [ result ] = await connection.execute(statement, [...Object.values(itemInfo), id]);
    return result;
  }
}

module.exports = CommonService;