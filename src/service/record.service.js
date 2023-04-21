const connection = require("../app/database");

class RecordService {
  async createRecord(userId, content) {
    const statement = `INSERT INTO record (userId, content) VALUES(?, ?)`
    const [ result ] = await connection.execute(statement, [userId, content]);
    return result;
  }
  async getRecordList(userId) {
    const statement = `SELECT * FROM record WHERE userId = ? ORDER BY createAt DESC`
    const [ result ] = await connection.execute(statement, [ userId ]);
    return result;
  }
}

module.exports = new RecordService();