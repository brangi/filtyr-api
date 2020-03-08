import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Answer  = new Schema({
  name: String,
  correct:  {
    type: Boolean,
    default: false
  }
});

const Question  = new Schema({
  name: String,
  answers: [Answer],
});

const ExamSchema  = new Schema({
  title: String,
  description: String,
  questions: [Question]
});

export const Exam = mongoose.model("Exam", ExamSchema);
