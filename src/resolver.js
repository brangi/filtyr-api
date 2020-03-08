import { Dog } from "./models/Dog";
import { Exam } from "./models/Exam";

export const resolvers = {
  Query: {
    helloWorld:() => 'hello world',
    dogs: () => Dog.find(),
    exams: () => Exam.find(),
    exam: async (parent, args, _, __) =>{
      return Exam.findById(args.id).exec()
    },
    question: async (parent, args, _, __) =>{
     return Exam.findById(args.id).exec()
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

