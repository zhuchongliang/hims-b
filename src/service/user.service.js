const connection = require("../app/database");
const CommonService = require("./common.service");

class service extends CommonService {
  constructor() {
    super("user");
  }
  async create(userInfo, next) {
    const result = this.createTableItem(userInfo);
    return result;
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async getUserById(id) {
    const statement = `SELECT * FROM user WHERE id = ?`
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  async updateAvatarUrlById(userId, avatarUrl) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}
module.exports = new service();