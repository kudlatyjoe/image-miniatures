const sharp = require('sharp')
const size = require('image-size')

//processing the buffer 
const processImage = (filename, buffer, outputWidth) => {
    //calculations for the relative height
    const {width, height} = size(buffer)
    const ratio = width/outputWidth
    const outputHeight = Math.round(height/ratio)

    //preparation of a unique filename
    const path = `images/${outputWidth}__${filename}`
    //100px wide image to be set as thumbnail for all files
    const thumb = `images/100__${filename}`

    //extending the standard image info with the pre-constructed filename
    return new Promise((res, rej) => 
        sharp(buffer)
        .resize(outputWidth, outputHeight)
        .toFile(`./public/${path}`)
        .then(info => {
            return res({...info, path: path, thumb: thumb})
        })
        .catch(err => rej(err))
    )
}

//exported upload function
const upload = (req, res, next) => {
    //preparation of all three desired output images
    const filename = `${new Date().toISOString()}__${req.file.originalname}`
    Promise.all([
        processImage(filename, req.file.buffer, 100),
        processImage(filename, req.file.buffer, 200),
        processImage(filename, req.file.buffer, 400)
    ])
    .then(files => res.render('index', {images: files, error: null}))
    .catch(err =>  res.render('index', {images: [], error: err.message}))
}

module.exports = {
    upload
}