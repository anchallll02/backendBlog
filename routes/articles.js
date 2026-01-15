const express = require("express")
const router = express.Router()
const {
  submitArticle,
  getAllArticles,
  getArticleBySlug
} = require("../controllers/articleController")

router.post("/submit", submitArticle)
router.get("/", getAllArticles)
router.get("/:slug", getArticleBySlug)

module.exports = router
