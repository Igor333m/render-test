import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

if (!url) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

mongoose.connect(url, { family: 4 }).then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  _id: Object,
  id: String,
  content: String,
  important: Boolean,
  __v: Number
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Note', noteSchema)