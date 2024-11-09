import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { CreateQuestionUseCase } from './create-question.use-case';

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (_: Question) => {},
};

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: 'author-id',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  });

  expect(question.id).toBeTruthy();
});
