import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerQuestionUseCase } from './answer-question.use-case';

const fakeAnswersRepository: AnswersRepository = {
  create: async (_: Answer) => {},
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
