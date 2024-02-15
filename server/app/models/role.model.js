const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

// ______________________________________________

RoleSchema.method("toJSON", function () {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
})

// ______________________________________________

module.exports = mongoose.model("RoleModel", RoleSchema);