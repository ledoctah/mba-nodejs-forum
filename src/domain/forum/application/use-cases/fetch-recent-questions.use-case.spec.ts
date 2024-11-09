import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions.use-case';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 10, 8) }),
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 10, 9) }),
    );

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 10, 1) }),
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 10, 9) }),
      expect.objectContaining({ createdAt: new Date(2024, 10, 8) }),
      expect.objectContaining({ createdAt: new Date(2024, 10, 1) }),
    ]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
