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

const ExamSchema  = new Schema({
  title: String,
  description: String,
  questions: [Question]
});

export const Exam = mongoose.model("Exam", ExamSchema);
