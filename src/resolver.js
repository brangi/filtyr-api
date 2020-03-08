import { Exam } from "./models/Exam";

export const resolvers = {
  Query: {
    exams: () => Exam.find(),
    exam: async (parent, args, _, __) =>{
      return Exam.findById(args.id).exec()
    },
    question: async (parent, args, _, __) =>{
      const exam = await Exam.findById(args.examId).exec();
      return exam.questions.find(q=> q._id.toString() === args.questionId);
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

