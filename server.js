const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
// const bodyParser = require('body-parser')
const blogsRouter = require('./routes/blogs')
const methodOverride = require('method-override')
const app = express()

// Links mongodb datebase to our project. Hard coded password into code "never do that in a actual code"
mongoose.connect('mongodb+srv://JordanHoward:JH8311995@cluster0.zfgs7.mongodb.net/JordanHoward?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// sets up our views.
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
// Overide the post and put methods, overides those methods into delete.
app.use(methodOverride('_method'))
//This links styles here
app.use('/public' , express.static('public'));


app.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: 'desc' })
    res.render('blogs/index', { blogs: blogs })
})


app.use('/blogs', blogsRouter)
//check this ^ might be labeled wrong


const port = process.env.PORT || 5500
app.listen(port,() => console.log(`Listening on port ${port}...`));
