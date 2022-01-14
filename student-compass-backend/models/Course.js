const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    name_Course: {
        type: String,
        required: true
    },
    description_Course: {
        type: String,
        required: true
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true 
    },
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if(ret.category.name) ret.category=ret.category.name;
    }
}); 

module.exports = mongoose.model("Course", schema)