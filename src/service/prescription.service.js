const connection = require("../app/database");
const CommonService = require("./common.service");

class PrescriptionService extends CommonService { 
  constructor() {
    super("prescription");
  }
  async getAllDrugUseCount() {
    const statement = `
      SELECT drugId,name,SUM(count) as count
      FROM prescription p
      LEFT JOIN drug_info d 
      ON p.drugId = d.id 
      GROUP BY drugId
    `
    const [ result ] = await connection.execute(statement)
    return result;
  }
  async getPrescriptionInfo(officeId, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT *  
      FROM prescription  
      WHERE officeId = ? 
      LIMIT ?, ?
    `
    const [ list ] = await connection.execute(statement, [ officeId, offset + "", size + "" ]);
    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM prescription  
      WHERE officeId = ? 
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ officeId ]);
    return {
      list,
      totalCount
    };
  }
  async searchPrescriptionInfo(officeId, keyword, queryInfo) {
    const { offset, size } = queryInfo;
    const statement = `
      SELECT * 
      FROM prescription  
      WHERE CONCAT(id, illness, drugId, remark, officeId) LIKE ? && officeId = ?   
      LIMIT ?, ?
    `
    const [ list ] = await connection.execute(statement, [`%${keyword}%`, officeId, offset + "", size + ""]);
    const statement1 = `
      SELECT COUNT(*) as totalCount
      FROM prescription
      WHERE CONCAT(id, illness, drugId, remark, officeId) LIKE ? && officeId = ?   
    `;
    const [ [ { totalCount }  ] ] = await connection.execute(statement1, [ `%${keyword}%`, officeId ]);
    return {
      list,
      totalCount
    };
  }
}
module.exports = new PrescriptionService();