import {Entity, model, property} from '@loopback/repository';

@model()
export class Level extends Entity {
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
  score: number;


  constructor(data?: Partial<Level>) {
    super(data);
  }
}

export interface LevelRelations {
  // describe navigational properties here
}

export type LevelWithRelations = Level & LevelRelations;
