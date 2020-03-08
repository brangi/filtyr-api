import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    helloWorld: String!
    dogs: [Dog!]!
    exams:[Exam!]!
    exam(id: ID!): Exam!
    question(id: ID!): Question!
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
    questions:[Question!]
}
type Mutation {
    createDog(name: String!): Dog!
}
`;