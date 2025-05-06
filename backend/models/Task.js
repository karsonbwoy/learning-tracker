import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tytuł jest wymagany"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Kategoria jest wymagana"],
        enum: ["Frontend", "Backend", "Inne"],
    },
    status: {
        type: String,
        required: [true, "Status jest wymagany"],
        enum: ["Do zrobienia", "W trakcie", "Zrobione"],
    },
    notes: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);