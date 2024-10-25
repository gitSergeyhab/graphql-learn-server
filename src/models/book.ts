  import mongoose  from "mongoose"

const BookSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writer",
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    mainCharacters: {
        type: [String],
        required: true
    },
    genre: {
        type: String,
    }
})


  export const BookModel = mongoose.model("Book", BookSchema)