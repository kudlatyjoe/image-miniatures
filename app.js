const express = require('express')
const path = require('path')
const http = require('http')
const multer = require('multer')

const {upload} = require('./file-controller')
const {storage, filter} = require('./multer-settings')

const app = express()
const server = http.createServer(app)
const PORT = 3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(multer({storage: storage, fileFilter: filter}).single('image'))


app.get('/', (req, res) => res.render('index', {images: [], error: null}))
app.post('/upload', upload)
app.use((req, res) => res.status(404).render('404'))

app.use((error, req, res, next) => {
    if (error) res.render('index', {images: [], error: error.message})
})

server.listen(PORT, () => console.log(`Server is listnening on port ${PORT}`))