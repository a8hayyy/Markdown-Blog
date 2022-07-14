const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./modules/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

const app = express()

const DB ='mongodb+srv://a8hay:abhayabhay@cluster0.kxe1f.mongodb.net/markdown?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => 
console.log('Connection Succesfull!')
).catch((err) => 
console.log('no connection!')
)

const viewsPath = path.join(__dirname, '/views/articles')

app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log('Server is Live on port 3000')
})

