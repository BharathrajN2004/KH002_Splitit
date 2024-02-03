import mongoose from "mongoose";


const groupSchema = new mongoose.Schema({
    grpName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    members: {
        type: [userSchema],
        required: true,
    },
    grpPic: {
        type: Image,

    },
    prevSplits: {
        type: [splitSchema]
    }
})

const splitSchema = new mongoose.Schema({
    splitName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    splitType: {
        type: String,
        enum: ["equal", "manual", "percentage", "shares"],
        default: "equal"
    }
})

const Group = mongoose.model('Group', groupSchema);

export default Group;