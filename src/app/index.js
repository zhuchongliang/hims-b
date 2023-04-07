const koa = require("koa");
const userRouter = require("../router/index");
const cors = require("koa-cors");
// const userRouter = require("../router/user.router");
// const loginRouter = require("../router/auth.router");
const bodyPaser = require("koa-bodyparser");
const errorHandle = require("../app/error-handle");
const app = new koa();
app.use(cors());
app.use(bodyPaser());
userRouter(app);
// app.use(loginRouter.routes());
// app.use(loginRouter.allowedMethods)
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
app.on("error", errorHandle);
module.exports = app; 