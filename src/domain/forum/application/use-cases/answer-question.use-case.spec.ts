import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { AnswerQuestionUseCase } from './answer-question.use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      content: 'Nova resposta',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
  });
});
