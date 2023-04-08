const connection = require("../app/database");
const CommonService = require("./common.service")
class StockService extends CommonService {
  constructor() {
    super("office_stock");
  }
  async getDurgStockInfo(officeId, drugId) {
    const statement = `
      SELECT id, drugCount FROM office_stock WHERE officeId = ? && drugId = ?
    `
    const [ result ] = await connection.execute(statement, [ officeId, drugId ]);
    return result;
  }
  async getStockInfo(officeId, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT s.id, s.officeId, s.drugId, s.drugCount, d.name, s.createAt, s.updateAt  
      FROM office_stock s 
      LEFT JOIN drug_info d
      ON s.drugId = d.id
      WHERE s.officeId = ? 
      LIMIT ?, ?
    `
    const [ list ] = await connection.execute(statement, [ officeId, offset + "", size + "" ]);
    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM office_stock s 
      JOIN drug_info d
      ON s.drugId = d.id
      WHERE s.officeId = ? 
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ officeId ]);
    return {
      list,
      totalCount
    };
  }
  async searchStockInfo(officeId, keyword, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT s.id, s.officeId, s.drugId, s.drugCount, d.name, s.createAt, s.updateAt  
      FROM office_stock s 
      JOIN drug_info d
      ON s.drugId = d.id
      WHERE CONCAT(s.id, s.officeId, s.drugId, d.name) LIKE ? && s.officeId = ? 
      LIMIT ?, ?  
    `
    const [ list ] = await connection.execute(statement, [`%${keyword}%`, officeId, offset + "", size + ""]);
    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM office_stock s 
      JOIN drug_info d
      ON s.drugId = d.id
      WHERE CONCAT(s.id, s.officeId, s.drugId, d.name) LIKE ? && s.officeId = ?  
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ `%${keyword}%`, officeId ]);
    return {
      list,
      totalCount
    };
  }
}

module.exports = new StockService();