import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question.use-case';

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
});