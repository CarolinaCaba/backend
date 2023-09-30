import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Subject,
  Level,
} from '../models';
import {SubjectRepository} from '../repositories';

export class SubjectLevelController {
  constructor(
    @repository(SubjectRepository)
    public subjectRepository: SubjectRepository,
  ) { }

  @get('/subjects/{id}/level', {
    responses: {
      '200': {
        description: 'Level belonging to Subject',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Level),
          },
        },
      },
    },
  })
  async getLevel(
    @param.path.string('id') id: typeof Subject.prototype.id,
  ): Promise<Level> {
    return this.subjectRepository.level(id);
  }
}
