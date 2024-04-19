import mongoose from "mongoose";

const registerModel = mongoose.Schema({
    username: { 
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Register", registerModel);