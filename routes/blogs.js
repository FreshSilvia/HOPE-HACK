const express = require('express')
const Blog = require('./../models/blog');
const router = express.Router()

// Get all Blogs 
router.get('/new', async (req,res) => {
    res.render('blogs/new' , {blog: new Blog() })
})

// Allows the user to edit that specific blog. 
router.get('/edit/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/edit', { blog: blog })
})

//Get a Blog by id; Slug changes number based id into a string and removes spaces and other none letter keys
router.get('/:slug', async (req,res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (blog == null) res.redirect('/')
    res.render('blogs/show' , { blog: blog})
})

//Post a Blog
router.post('/', async (req,res, next) => {
    req.blog = new Blog()
    next()
}, saveBlogAndRedirect('new'))

//Delete a Blog by id
router.delete('/:id', async (req,res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//Update a Blog
router.put('/:id', async (req,res, next) => {
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveBlogAndRedirect('edit'))

function saveBlogAndRedirect(path) {
    return async (req, res) => {
      let blog = req.blog
      blog.title = req.body.title
      blog.description = req.body.description
      try {
        blog = await blog.save()
        res.redirect(`/blogs/${blog.slug}`)
      } catch (e) {
        res.render(`blogs/${path}`, { blog: blog })
      }
    }
}

module.exports = router
