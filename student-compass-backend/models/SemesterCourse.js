const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId, 
        ref: 'Course',
        required: true
    },
    term: {
        type: Schema.Types.ObjectId, 
        ref: 'Term',
        required: true
    },
    nombre_etudiants: {
        type: Number,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if(ret.course.name_Course) ret.course=ret.course.name_Course;
        if(ret.term.name) ret.term=ret.term.name;
        if(ret.teacher.fname && ret.teacher.lname) ret.teacher=ret.teacher.fname+" "+ret.teacher.lname;
    }
}); 

module.exports = mongoose.model("SemesterCourse", schema)