import { Exam } from './Exam';
import  faker  from 'faker';
async function main() {
  let questions = [];
  Array(10).fill().forEach(_=>{
    questions.push({
      name: faker.lorem.sentence(),
      answers :[{name: "madrid"},{ name:"london"}, {name:"france", correct:true}]
    })
  });
  await Exam.create({
    title: 'Title Exam',
    description: faker.lorem.paragraph(),
    questions: questions
  })
}

main();