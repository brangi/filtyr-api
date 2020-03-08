import { Exam } from './Exam';

async function main() {
  await Exam.create({
    title: 'also_awesome',
    questions: [
      {
        name: "Which is the capital of France",
        answers :[{name: "madrid"},{ name:"london"}, {name:"france", correct:true}]
      }
    ]
  })
}

main();