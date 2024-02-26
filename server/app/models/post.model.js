const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        user: {
            // type: Schema.Types.ObjectId,
            type: String,
            // ref: 'UserModel',
            // required: [true, 'Please specify user role'],
        },
    },
    {
        timestamps: true
    }
);

// ______________________________________________

PostSchema.method("toJSON", function () {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
})

// ______________________________________________

module.exports = mongoose.model("PostModel", PostSchema);