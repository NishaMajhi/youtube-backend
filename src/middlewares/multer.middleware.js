import multer from 'multer';

function checkFileAllowed(file) {

    const mimetype = file.mimetype
    const extension = mimetype.split('/')[1]

    const allowedExtensions = ['jpg', 'png', 'jpeg']

    const include = allowedExtensions.includes(extension);

    if (!include) {
        return { status: false, message: `Allowed Extension are ${allowedExtensions.join(" , ")}` }
    } else {
        return { status: true }
    }
}

const userStorage = multer.diskStorage({

    destination: function (req, file, cb) {

        const response = checkFileAllowed(file)

        if (response.status) {
            cb(null, `./public/user`)
        } else {
            cb(new Error(response.message), null);
        }
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },


})

export const uploadUser = multer(
    { userStorage }
)