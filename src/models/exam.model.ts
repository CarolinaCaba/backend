import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Subject} from './subject.model';

@model()
export class Exam extends Entity {
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

  @belongsTo(() => User, {name: 'student'})
  student_id: string;

  @belongsTo(() => User, {name: 'teacher'})
  teacher_id: string;

  @belongsTo(() => Subject, {name: 'subject'})
  subject_id: string;

  constructor(data?: Partial<Exam>) {
    super(data);
  }
}

export interface ExamRelations {
  // describe navigational properties here
}

export type ExamWithRelations = Exam & ExamRelations;
