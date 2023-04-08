const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path")
const Multer = require("koa-multer");
const path = require("path");
const Jimp = require("Jimp");
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
const picturesResize = async function (ctx, next) {
  const files = ctx.req.files;
  for (let file of files) {
    const destpath = path.join(file.destination, file.filename);
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destpath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destpath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destpath}-small`);
    });
  }
  await next();
}
const avatarHandler = avatarUpload.single("file");
module.exports = { avatarHandler,  picturesResize };