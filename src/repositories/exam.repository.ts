import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Exam, ExamRelations, User, Subject} from '../models';
import {UserRepository} from './user.repository';
import {SubjectRepository} from './subject.repository';

export class ExamRepository extends DefaultCrudRepository<
  Exam,
  typeof Exam.prototype.id,
  ExamRelations
> {

  public readonly student: BelongsToAccessor<User, typeof Exam.prototype.id>;

  public readonly teacher: BelongsToAccessor<User, typeof Exam.prototype.id>;

  public readonly subject: BelongsToAccessor<Subject, typeof Exam.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>,
  ) {
    super(Exam, dataSource);
    this.subject = this.createBelongsToAccessorFor('subject', subjectRepositoryGetter,);
    this.registerInclusionResolver('subject', this.subject.inclusionResolver);
    this.teacher = this.createBelongsToAccessorFor('teacher', userRepositoryGetter,);
    this.registerInclusionResolver('teacher', this.teacher.inclusionResolver);
    this.student = this.createBelongsToAccessorFor('student', userRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
  }
}
