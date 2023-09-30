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
  Subject,
} from '../models';
import {ExamRepository} from '../repositories';

export class ExamSubjectController {
  constructor(
    @repository(ExamRepository)
    public examRepository: ExamRepository,
  ) { }

  @get('/exams/{id}/subject', {
    responses: {
      '200': {
        description: 'Subject belonging to Exam',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Subject),
          },
        },
      },
    },
  })
  async getSubject(
    @param.path.string('id') id: typeof Exam.prototype.id,
  ): Promise<Subject> {
    return this.examRepository.subject(id);
  }
}
