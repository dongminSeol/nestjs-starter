import { BaseDto } from './base.dto';

export abstract class BaseAbstractEntity<DTO extends BaseDto = BaseDto, O = never> {
  id!: number;

  createdAt!: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  toDto(options?: O): DTO {
    const dtoClass = Object.getPrototypeOf(this).dtoClass;

    if (!dtoClass) {
      throw new Error(`You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`);
    }

    return new dtoClass(this, options);
  }
}
