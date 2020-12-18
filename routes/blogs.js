const express = require('express')
const Blog = require('./../models/blog');
const router = express.Router()

// Get all Blogs 
router.get('/new', async (req,res) => {
    res.render('blogs/new' , {blog: new Blog() })
    // const blogs = await Blog.find().sort({ createdAt: 'desc' })
    // res.send(blogs)
})

router.get('/edit/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/edit', { blog: blog })
})

//Get a Blog by id
router.get('/:slug', async (req,res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (blog == null) res.redirect('/')
    res.render('blogs/show' , { blog: blog})
    // Code broke here
    // Page will not load with the id like on video 35 mins. cannot see id of blog.
    // res.send(req.params.id)
})

//Post a Blog
router.post('/', async (req,res, next) => {
    req.blog = new Blog()
    next()
    // let blog = new Blog({
    //     title: req.body.title,
    //     dateCreated: req.body.dateCreated,
    //     description: req.body.description
    // })
    // try {
    //     blog = await blog.save()
    //     res.redirect(`/blogs/${blog.slug}`)
    // } catch (e) {
    //     console.log(e)
    //     res.render('blogs/new' , {blog: blog})
    // }
    // // console.log(req.body);
    // // res.send(req.body);
    // // let newBlog = new Blog();
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
