import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    exams:[Exam!]!
    exam(id: ID!): Exam!
    getQuestionById(questionId: ID!, examId :ID!): Question!
    getQuestion(questionNum: Int!, examId :ID!, total :Int): QuestionPage!
}
type ExamResult {
    id: ID!
    demoTaker: String
    type: String
    exam: ID
}
type Answer {
    id: ID
    name: String
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
type QuestionPage {
    id: ID
    name: String
    answers:[Answer!]
    page: Int
    prev: Int
    next: Int
}
type Mutation {
    startExamMutation(demoTaker: String!, exam: ID!): ExamResult!,
    answerQuestion(examResultId :ID!, question: ID!, answer: ID!): ExamResult!
}

`;