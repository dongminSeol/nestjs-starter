import { BaseAbstractEntity } from './base.abstract.entity';

export class BaseDto {
  id!: number;

  createdAt!: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  constructor(entity: BaseAbstractEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
    entity.toDto();
  }
}
