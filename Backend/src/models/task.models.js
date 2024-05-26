import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
// created at & updated at



export const Task = mongoose.model("Task", taskSchema);