const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    intensity: {
        type: String,
        enum: ['High','Medium','Low'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    date: {
        type: Number,
        required: true
    }
});

module.exports = Workout = mongoose.model("workouts", WorkoutSchema);
