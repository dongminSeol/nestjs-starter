import { BaseDto } from '../../../../../base/base.dto';
import { MomentEntity } from '../repository/moment.entity';

export class MomentDto extends BaseDto {
  constructor(moment: MomentEntity) {
    super(moment);
  }
}
