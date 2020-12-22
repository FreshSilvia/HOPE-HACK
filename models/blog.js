const mongoose = require('mongoose')
const slugify = require('slugify')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    // required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
      type: String,
      required: true,
      unique: true
  }
})

blogSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})


module.exports = mongoose.model('Blog', blogSchema)
