const fs = require("fs");
const dir = fs.readdirSync("./src/router");
const reg = /router.js$/;
const userRouter = function (app) {
  dir.forEach((file) => {
    if (reg.test(file)) {
      const router = require("../router/" + file);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  })
}
module.exports = userRouter;  