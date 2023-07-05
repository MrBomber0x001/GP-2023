import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { BadRequestError } from "../error/badRequest.js";

// check if folder exist, if not create one
const dir1 = path.join(dirname, "../public");
if (!fs.existsSync(dir1)) {
    fs.mkdirSync(dir1);
}

// check if folder exist, if not create one
const dir2 = path.join(dirname, "../public/uploads");
if (!fs.existsSync(dir2)) {
    fs.mkdirSync(dir2);
}

// check if folder exist, if not create one
const dir3 = path.join(dirname, "../public/uploads/images");
if (!fs.existsSync(dir3)) {
    fs.mkdirSync(dir3);
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(dirname, "../public/uploads/images"));
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.originalname.split(".")[0] +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

// Init Upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new BadRequestError("Images Only!"));
    }
}

export default upload;

