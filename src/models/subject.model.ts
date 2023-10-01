import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Level} from './level.model';

@model()
export class Subject extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Level, {name: 'level'})
  levelId: string;

  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

export interface SubjectRelations {
  // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
