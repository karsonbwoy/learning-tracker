import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Imię jest wymagane"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email jest wymagany"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, "Niepoprawny email"]
    },
    password: {
        type: String,
        required: [true, "Hasło jest wymagane"],
        minlength: [6, "Hasło musi mieć co najmniej 6 znaków"]
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch (error) {
        throw new Error("Błąd podczas porównywania hasła: " + error.message);
    }
}

export default mongoose.model("User", userSchema);