import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Level} from './level.model';

@model()
export class Subject extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  name: number;

  @belongsTo(() => Level, {name: 'level'})
  level_id: string;

  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

export interface SubjectRelations {
  // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
