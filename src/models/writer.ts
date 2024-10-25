
import mongoose  from "mongoose"

const WriterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthYear: {
    type: Number,
    required: true
  },
  deathYear: {
    type: Number,
  },
  country: {
    type: String,
    required: true
  },
  city: { 
    type: String, 
  }
})

export const WriterModel = mongoose.model("Writer", WriterSchema)