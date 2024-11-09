import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { EditAnswerUseCase } from './edit-answer.use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'New Content',
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'New Content',
    });
  });

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    );

    inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
