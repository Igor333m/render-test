import mongoose from 'mongoose'

export default interface NoteDocument {
  _id?: mongoose.Types.ObjectId
  __v?: number
  content?: string | null
  important?: boolean | null
  id?: string
}