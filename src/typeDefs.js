import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    exams:[Exam!]!
    exam(id: ID!): Exam!
    getQuestionById(questionId: ID!, examId :ID!): Question!
    getQuestion(questionNum: Int!, examId :ID!): QuestionPage!
}
type Dog {
    id: ID!
    name: String!
}
type Answer {
    id: ID
    name: String
    correct: Boolean
}
type Question {
    id: ID
    name: String
    answers:[Answer!]
}
type Exam {
    id: ID
    title: String
    description: String
    questions:[Question!]
}
type Mutation {
    createDog(name: String!): Dog!
}
type QuestionPage {
    id: ID
    name: String
    answers:[Answer!]
    prev: Int
    next: Int
}
`;