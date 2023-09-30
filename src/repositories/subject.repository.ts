import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Subject, SubjectRelations, Level} from '../models';
import {LevelRepository} from './level.repository';

export class SubjectRepository extends DefaultCrudRepository<
  Subject,
  typeof Subject.prototype.id,
  SubjectRelations
> {

  public readonly level: BelongsToAccessor<Level, typeof Subject.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LevelRepository') protected levelRepositoryGetter: Getter<LevelRepository>,
  ) {
    super(Subject, dataSource);
    this.level = this.createBelongsToAccessorFor('level', levelRepositoryGetter,);
    this.registerInclusionResolver('level', this.level.inclusionResolver);
  }
}
