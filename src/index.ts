import 'dotenv/config'
import express from 'express'
import Note from './models/note.js'
 
const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/notes', (request, response) => {
  Note.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note)
  }).catch(( e ) =>  {
      response.statusMessage = 'Note not found!'
      response.status(404).end()
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {

      if(result) {
        response.statusMessage = 'Note successufully deleted!'
        response.status(204).end()
      } else response.status(404).json({ error: 'Note not found!' })
    })
    .catch((error) => {
      response.status(500).json({ error: 'Something went wrong!' })
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})