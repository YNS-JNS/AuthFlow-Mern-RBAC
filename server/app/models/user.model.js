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
            required: [true, 'Email not provided!'],
            trim: true,
            minlength: [2, 'Email is too short!'],
            // maxlength: [80, 'Email is too long!'],
            unique: [true, "Email already exists!"],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            trim: true,
            minlength: [8, 'Password is too short!'],
        },
        // One-To-Many data modeling:
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'RoleModel',
                required: [true, 'Please specify user role'],
            }
        ]
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