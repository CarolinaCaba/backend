import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Exam,
  User,
} from '../models';
import {ExamRepository} from '../repositories';

export class ExamUserController {
  constructor(
    @repository(ExamRepository)
    public examRepository: ExamRepository,
  ) { }

  @get('/exams/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Exam',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Exam.prototype.id,
  ): Promise<User> {
    return this.examRepository.teacher(id);
  }
}
