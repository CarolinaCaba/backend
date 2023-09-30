import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Level, LevelRelations} from '../models';

export class LevelRepository extends DefaultCrudRepository<
  Level,
  typeof Level.prototype.id,
  LevelRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Level, dataSource);
  }
}
