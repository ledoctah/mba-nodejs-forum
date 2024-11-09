import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { EditQuestionUseCase } from './edit-question.use-case';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'New Title',
      content: 'New Content',
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New Title',
      content: 'New Content',
    });
  });

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'New Title',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
