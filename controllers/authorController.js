const Author = require("../models/Author")

const createAuthor = async (req, res) => {
  try {
    const { name, bio, linkedin, github } = req.body
    if (!name) return res.status(400).json({ message: "Name required" })
    const author = new Author({ name, bio, linkedin, github })
    await author.save()
    res.status(201).json(author)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find()
    res.json(authors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    if (!author) return res.status(404).json({ message: "Author not found" })
    res.json(author)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createAuthor, getAllAuthors, getAuthorById }
