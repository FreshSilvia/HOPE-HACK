const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
// const bodyParser = require('body-parser')
const blogsRouter = require('./routes/blogs')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://JordanHoward:JH8311995@cluster0.zfgs7.mongodb.net/JordanHoward?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
// mongoose.connect('mongodb://localhost/blog', { 
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  
// })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
//This links styles here
app.use('/public' , express.static('public'));


app.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: 'desc' })
    res.render('blogs/index', { blogs: blogs })
})


app.use('/blogs', blogsRouter)
//check this ^ might be labeled wrong


const port = process.env.PORT || 5001
app.listen(port,() => console.log(`Listening on port ${port}...`));
