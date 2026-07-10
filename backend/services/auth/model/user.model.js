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
    avatar : String
}, {timestamps : true});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;