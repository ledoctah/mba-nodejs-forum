import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { DeleteQuestionCommentUseCase } from './delete-question-comment.use-case';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to delete a question comment', async () => {
    const newQuestion = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionCommentsRepository.create(newQuestion);

    await sut.execute({
      questionCommentId: 'question-1',
      authorId: 'author-1',
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user question comment', async () => {
    const newQuestion = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    );

    await inMemoryQuestionCommentsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionCommentId: 'question-1',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
