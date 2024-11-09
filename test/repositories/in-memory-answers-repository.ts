import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toValue() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const itemsIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemsIndex, 1);
  }
}
