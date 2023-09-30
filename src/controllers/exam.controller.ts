import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Exam} from '../models';
import {ExamRepository} from '../repositories';

export class ExamController {
  constructor(
    @repository(ExamRepository)
    public examRepository : ExamRepository,
  ) {}

  @post('/exams')
  @response(200, {
    description: 'Exam model instance',
    content: {'application/json': {schema: getModelSchemaRef(Exam)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exam, {
            title: 'NewExam',
            exclude: ['id'],
          }),
        },
      },
    })
    exam: Omit<Exam, 'id'>,
  ): Promise<Exam> {
    return this.examRepository.create(exam);
  }

  @get('/exams/count')
  @response(200, {
    description: 'Exam model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Exam) where?: Where<Exam>,
  ): Promise<Count> {
    return this.examRepository.count(where);
  }

  @get('/exams')
  @response(200, {
    description: 'Array of Exam model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Exam, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Exam) filter?: Filter<Exam>,
  ): Promise<Exam[]> {
    return this.examRepository.find(filter);
  }

  @patch('/exams')
  @response(200, {
    description: 'Exam PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exam, {partial: true}),
        },
      },
    })
    exam: Exam,
    @param.where(Exam) where?: Where<Exam>,
  ): Promise<Count> {
    return this.examRepository.updateAll(exam, where);
  }

  @get('/exams/{id}')
  @response(200, {
    description: 'Exam model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Exam, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Exam, {exclude: 'where'}) filter?: FilterExcludingWhere<Exam>
  ): Promise<Exam> {
    return this.examRepository.findById(id, filter);
  }

  @patch('/exams/{id}')
  @response(204, {
    description: 'Exam PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exam, {partial: true}),
        },
      },
    })
    exam: Exam,
  ): Promise<void> {
    await this.examRepository.updateById(id, exam);
  }

  @put('/exams/{id}')
  @response(204, {
    description: 'Exam PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() exam: Exam,
  ): Promise<void> {
    await this.examRepository.replaceById(id, exam);
  }

  @del('/exams/{id}')
  @response(204, {
    description: 'Exam DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.examRepository.deleteById(id);
  }
}
