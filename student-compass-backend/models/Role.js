const mongoose = require("mongoose")

const schema = mongoose.Schema({
    desc_role: {
        type: String,
        required: true
    },
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model("Role", schema)