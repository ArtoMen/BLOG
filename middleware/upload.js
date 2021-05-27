const moment = require("moment");
const multer = require("multer");
const config = require('../config/config');


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, config.pathToUploads);
    },
    filename(req, file, cb) {
        const time = moment().format('DD-MM-YYYY_HH-mm-ss-SSS');
        cb(null, `${time}-${req.file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.indexOf('image') > -1) cb(null, true);
    else cb(null, false);
}

const limits = {
    fileSize: 1024 * 1024 * 3
}

module.exports = multer({ storage, fileFilter, limits });