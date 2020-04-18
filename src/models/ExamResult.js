import mongoose from "mongoose";
/*
const main =async ()=>{
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/filtyr", {useNewUrlParser: true, useUnifiedTopology: true})
  }catch(err){
    console.log(err)
  }
};

main()

 */

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
  //taker: { type: Schema.Types.ObjectId, ref: 'User' },
  demoTaker: String, // IP or email temporarily?
  answers:[AnsweredQuestion],
  results: {
    correct: Number,
  },
});

export const ExamResult = mongoose.model("ExamResult", ExamResultSchema);
