const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'first name is required!'],
            trim: true,
            minlength: [2, 'first name is too short!'],
            maxlength: [28, 'first name is too long!'],
        },
        lastName: {
            type: String,
            required: [true, 'last name is required!'],
            trim: true,
            minlength: [2, 'last name is too short!'],
            maxlength: [28, 'last name is too long!'],
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            trim: true,
            minlength: [2, 'Email is too short!'],
            maxlength: [50, 'Email is too long!'],
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            trim: true,
            minlength: [8, 'Password is too short!'],
            // maxlength: [28, 'Password is too long!'],
        },
    },
    {
        timestamps: true
    }
);

// ______________________________________________

UserSchema.method("toJSON", function () {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
})

// ______________________________________________

module.exports = mongoose.model("UserModel", UserSchema);