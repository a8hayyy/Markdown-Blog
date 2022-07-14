const express = require('express')
const Article = require('../modules/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('show', { article: article })
})

router.post('/', (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      let ro = `${article.slug}`
      res.redirect(ro)
    } catch (e) {
      const articles = await Article.find().sort({ createdAt: 'desc' })
      res.render('index', { articles: articles })
      // let route = `${path}`
      // res.render(route, { article: article })
    }
  }
}

module.exports = router