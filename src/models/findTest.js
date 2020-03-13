import { Exam } from './Exam';
import mongoose from "mongoose";

mongoose.Types.ObjectId();
async function main() {
  console.log(new mongoose.Types.ObjectId("5e6495240b3777b5ff8ffa35"));
  const exams = await Exam.findOne({_id: new mongoose.Types.ObjectId("5e6495240b3777b5ff8ffa35")} ).exec();
  const exams2 = await Exam.findOne({_id: new mongoose.Types.ObjectId("5e6495240b3777b5ff8ffa35")}, { questions: { $slice: [ 0, 1 ] } } ).exec();
  console.log(exams.questions[0]);
  console.log(JSON.stringify(exams2.questions.map(q=>q._id), null ,2))
}
main();