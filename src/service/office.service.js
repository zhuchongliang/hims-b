const connection = require("../app/database");
const CommonService = require("./common.service")
class OfficeService extends CommonService {
  constructor() {
    super("drug_office");
  }
  async getUserOffice(id) {
    const statement = `SELECT id as officeId FROM drug_office WHERE owner = ?`
    const [ result ] = await connection.execute(statement, [ id ]);
    return result;
  }
  async getDrugOfiiceAmount() {
    const statement = `SELECT count(*) as number FROM drug_office`
    const [ result ] = await connection.execute(statement);
    return result;
  } 
}

module.exports = new OfficeService();