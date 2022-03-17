const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/fotos");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname); //serve para que duas pessoas não por a mesma foto
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
