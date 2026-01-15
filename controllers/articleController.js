const Article = require("../models/Article")
const Author = require("../models/Author")

// 1️⃣Submit Article
const submitArticle = async (req, res) => {
  try {
    const { title, content, category, authorId } = req.body

    if (!title || !content || !category || !authorId) {
      return res.status(400).json({ message: "All fields required" })
    }

    const article = new Article({
      title,
      content,
      category,
      author: authorId,
      reviewed: false
    })

    await article.save()
    res.status(201).json({ message: "Article submitted for review" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 2️⃣ Get All Articles (Only Reviewed)
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ reviewed: true }).populate("author")
    res.json(articles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 3️⃣ Get Article by Slug (Simplify: slug = _id)
const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findById(req.params.slug).populate("author")
    if (!article) return res.status(404).json({ message: "Article not found" })
    res.json(article)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { submitArticle, getAllArticles, getArticleBySlug }
