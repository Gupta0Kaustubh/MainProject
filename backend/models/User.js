const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    gender: String,
    doj: Date,
    specializations: String,
    dob: Date,
    city: String,
    state: String,
    experience: String,
    userType:String,
    subscribeNewsletter: Boolean,
    passwords: String
});

const UserData = mongoose.model('UserData', userDataSchema);

const trainerSchema = new mongoose.Schema({
    userId: {type:String},
    trainerName: { type: String, required: true },
    trainerDesignation: { type: String, required: true },
    trainerRating: { type: Number, min: 1, max: 5, default: 1 }, // Assuming rating ranges from 1 to 5
    trainerSpecialization: { type: String, required: true }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

const trainingSchema = new mongoose.Schema({
    trainingId: { type: String, required: true },
    trainingName: { type: String, required: true },
    trainingDescription: { type: String },
    trainerId: { type: String, required: true },
    trainerName:{ type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    optimizedDuration: { type: Number, required: true }, // Duration in hours or days
    createdAt: { type: Date, default: Date.now }
});

const Training = mongoose.model('Training', trainingSchema);

const quizDataSchema = new mongoose.Schema({
    quizName: { type: String, required: true },
    trainingId: { type: String, required: true },
  trainingName: { type: String, required: true },
  maxScores: { type: Number, required: true },
  minScores: { type: Number, required: true },
  difficultyLevel: { type: String, enum: ['easy', 'moderate', 'hard'], default: 'easy' },
  questionFile: { type: String, required: true },
});

const QuizData = mongoose.model('QuizData', quizDataSchema);

const trackerSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    trainingId: {type: String, required: true},
    trainerId: {type: String, required: true},
    trainingStatus: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' }, // Training status (enum with default value)
    assessment_percentage_done: { type: Number, min: 0, max: 100, default: 0 }, // Percentage of assessment done
    assessment_completion_time_in_hours: { type: Number, default: 0 },
    scoreAchievedInQuiz: { type: Number },
    quizPassedOrFailed: {type: String},
    ratingGivenByTrainer: { type: Number, min: 1, max: 5 } // Assuming rating ranges from 1 to 5
});

const Tracker = mongoose.model('Tracker', trackerSchema);

module.exports = { UserData, Trainer, Training, QuizData, Tracker };
