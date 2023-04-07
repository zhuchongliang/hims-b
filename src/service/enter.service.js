const connection = require("../app/database");
const CommonService = require("./common.service");

class EnterService extends CommonService { 
  constructor() {
    super("office_enter");
  }
  async getEnterInfo(officeId, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT *
      FROM office_enter 
      WHERE officeId = ? 
      LIMIT ?, ?
    `
    const [ list ] = await connection.execute(statement, [ officeId, offset + "", size + "" ]);
    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM office_enter
      WHERE officeId = ? 
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ officeId ]);
    return {
      list,
      totalCount
    };
  }
  async searchEnterInfo(officeId, keyword, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT * 
      FROM office_enter  
      WHERE CONCAT(id, officeId, drugId) LIKE ? && officeId = ?   
      LIMIT ?, ?
    `
    const [ list ] = await connection.execute(statement, [`%${keyword}%`, officeId, offset + "", size + ""]);

    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM office_enter
      WHERE CONCAT(id, officeId, drugId) LIKE ? && officeId = ?   
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ `%${keyword}%`, officeId ]);
    return {
      list,
      totalCount
    };
  }
}
module.exports = new EnterService();