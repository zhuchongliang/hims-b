const connection = require("../app/database")
class FileService {
  //创建头像信息，保存在数据库中
  async createAvatar(avatar, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [avatar.filename, avatar.mimetype, avatar.size, userId]);
    return result;
  }
  async getAvatarInfo(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`;
    const [result] = await connection.execute(statement, [userId]);
    return result[result.length - 1];
  }
}
module.exports = new FileService();