import { Exam } from "./models/Exam";
import { ExamResult } from "./models/ExamResult";

export const resolvers = {
  Query: {
    exams: () => Exam.find(),
    exam: (parent, args, _, __) =>{
      return Exam.findById(args.id).exec()
    },
    getQuestionById: async (parent, args, _, __) =>{
      const exam = await Exam.findById(args.examId);
      return exam.questions.id(args.questionId);
    },
    getExamResult: async (parent, args, _, __) =>{
      const examResult = await ExamResult.findById(args.examResultId);
      return examResult;
    },
    getQuestion: async (parent, args, _, __) =>{
      let question ={};
      const exam = await Exam.findOne({_id: args.examId},
          {
            questions: { $slice: [args.questionNum - 1 , 1 ] }
          });
      if(exam.questions[0]) {
        question = exam.questions[0];
        question.page = args.questionNum;
        question.next = (args.questionNum+1 <= args.total)? args.questionNum+1  : undefined;
        question.prev = (args.questionNum-1) > 0 ? args.questionNum-1 : undefined
      }
      question.exam = exam._id;
      return question;
    },
  },
  Mutation: {
    startExamMutation: async(_, { demoTaker, exam }) => {
      const examResult = new ExamResult({
        demoTaker,
        exam
      });
      await examResult.save();
      return examResult
    },
    answerQuestion: async(_, {examResultId, question, answer }) => {
      const examResult  = await ExamResult.findById(examResultId);
      examResult.answers.push({
        question,
        answer
      });
      await examResult.save();
      return examResult
    }
  }
};

