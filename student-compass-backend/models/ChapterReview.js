const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    student_course: {
        type: Schema.Types.ObjectId, 
        ref: 'StudentCourse',
        required: true
    },
    semesterchapter: {
        type: Schema.Types.ObjectId, 
        ref: 'SemesterChapter',
        required: true
    },
    note_review: {
        type: Number,
        required: true
    },
    text_review: {
        type: String,
        required: true
    }
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("ChapterReview", schema)