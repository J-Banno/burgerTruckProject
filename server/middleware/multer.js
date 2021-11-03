const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accesKeyID = process.env.AWS_KEY;
const accesSecretKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region: region,
  accessKeyId: accesKeyID,
  secretAccessKey: accesSecretKey,
});

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/images");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const name = file.originalname.split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    callback(null, name + Date.now + "." + extension);
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // metadata: function (req, file, cb) {
    //   cb(null, { fieldName: file.fieldname });
    //   console.log(file);
    // },
    key: function (req, file, cb) {
      console.log(file);
      const name = file.originalname.split(" ").join("-");
      const extension = MIME_TYPE[file.mimetype];
      cb(null, name);
    },
  }),
});

module.exports = upload.single("file");
