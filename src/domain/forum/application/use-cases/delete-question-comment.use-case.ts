import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const question =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!question) {
      throw new Error('Question comment not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.questionCommentsRepository.delete(question);

    return {};
  }
}
