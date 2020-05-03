import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    exams:[Exam!]!
    exam(id: ID!): Exam!
    getQuestionById(questionId: ID!, examId :ID!): Question!
    getQuestion(questionNum: Int!, examId :ID!, total :Int): QuestionPage!
    getExamResult(examResultId: ID!): ExamResult!
}
type ExamResult {
    id: ID!
    demoTaker: String
    type: String
    exam: ID
    lastAnsweredNoQuestion: Int
    totalQuestions: Int
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
    id: ID!
    name: String
    answers:[Answer!]
    page: Int
    prev: Int
    next: Int
    exam: ID
}
type Mutation {
    startExamMutation(demoTaker: String!, exam: ID!): ExamResult!,
    answerQuestion(examResultId :ID!, question: ID!, answer: ID!): ExamResult!
}
`;