import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid : {
        type : String,
        unique : true
    },
    name : {
        type : String
    },
    email : String,
    avatar : String,
    plan : {
        type : String,
        default : "free"
    },
    credits : {
        type  :  Number,
        default : 100
    },
    totlalCreadits : {
        type : Number,
        default : 100
    },
    planExpiredAt : Date
}, {timestamps : true});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;