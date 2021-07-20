const multer = require('multer')

const storage = multer.memoryStorage()

const filter = (req, file, cb) => {
    if (['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype))
        cb(null, true)
    else 
        cb(new Error('File type validation error. Only .png/.jpg/.jpeg images allowed!'), false)
}

module.exports = {
    storage,
    filter
}