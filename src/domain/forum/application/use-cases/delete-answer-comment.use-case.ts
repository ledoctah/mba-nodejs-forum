import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answer =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answer) {
      throw new Error('Answer comment not found');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.answerCommentsRepository.delete(answer);

    return {};
  }
}
