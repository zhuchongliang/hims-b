const { APP_PORT } = require("./app/config")
const app = require("./app");
app.listen(APP_PORT, () => {
  console.log("服务器启动成功");
})