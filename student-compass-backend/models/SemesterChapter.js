const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    moyenne_Chapter: {
        type: Number,
        required: true
    },
    nombre_de_Reviews: {
        type: Number,
        required: true
    },
    semestercourse: {
        type: Schema.Types.ObjectId, 
        ref: 'SemesterCourse',
        required: true 
    },
    chapter: {
        type: Schema.Types.ObjectId, 
        ref: 'Chapter',
        required: true 
    },
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if(ret.course.name_Course) ret.course=ret.course.name_Course;
    }
}); 

module.exports = mongoose.model("SemesterChapter", schema)