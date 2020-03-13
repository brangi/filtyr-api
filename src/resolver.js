import { Exam } from "./models/Exam";
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
      return question;
    },
  },
  Mutation: {
    createDog: async(_, { name }) => {
      const puppy = new Dog({ name });
      await puppy.save();
      return puppy;
    }
  }
};

