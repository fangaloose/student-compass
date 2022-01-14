const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId, 
        ref: 'Role',
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        if(ret.role.desc_role) ret.role=ret.role.desc_role;
        delete ret.password;
    }
}); 

module.exports = mongoose.model("User", schema)