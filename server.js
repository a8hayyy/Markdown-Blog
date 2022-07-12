const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const articleRouter = require('./routes/articles')
const app = express()

const DB ='mongodb+srv://a8hay:abhayabhay@cluster0.kxe1f.mongodb.net/markdow.name1?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateindex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connection Succesfull!')
}).catch((err) => 
    console.log('no connection!')
)

const viewsPath = path.join(__dirname, '/views/articles')

app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article2',
        createdAt: new Date(),
        description: 'Test description2'
    }]
    res.render('index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log('Server is Live on port 3000')
})
