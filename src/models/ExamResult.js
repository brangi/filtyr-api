import mongoose from "mongoose";
import {Exam} from "./Exam"
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Answer  = new Schema({
  name: String,
  correct:  {
    type: Boolean,
    default: false,
    select: false
  }
});

const Question  = new Schema({
  name: String,
  answers: [Answer],
});

const AnsweredQuestion  = new Schema({
  question: { type: Schema.Types.ObjectId },
  answer: { type: Schema.Types.ObjectId },
});

const ExamResultSchema  = new Schema({
  exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
  type: {
    type: String,
    default: 'demo'
  },
  demoTaker: String, // IP or email temporarily?
  answers:[AnsweredQuestion],
  results: {
    correct: Number,
  },
  lastAnsweredNoQuestion: Number,
  totalQuestions: Number
});

ExamResultSchema.pre('save', async function (next) {
   this.lastAnsweredNoQuestion = this.answers.length;
   const exam = await Exam.findById(this.exam);
   this.totalQuestions = exam.questions.length;
   next();
});

export const ExamResult = mongoose.model("ExamResult", ExamResultSchema);
