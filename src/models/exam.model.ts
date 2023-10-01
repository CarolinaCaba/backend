import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Subject} from './subject.model';
import {User} from './user.model';

@model()
export class Exam extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  score: number;

  @belongsTo(() => User, {name: 'student'})
  studentId: string;

  @belongsTo(() => User, {name: 'teacher'})
  teacherId: string;

  @belongsTo(() => Subject, {name: 'subject'})
  subjectId: string;

  constructor(data?: Partial<Exam>) {
    super(data);
  }
}

export interface ExamRelations {
  // describe navigational properties here
}

export type ExamWithRelations = Exam & ExamRelations;
