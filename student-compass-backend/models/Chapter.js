const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name_Chapter: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId, 
        ref: 'Course',
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

module.exports = mongoose.model("Chapter", schema)