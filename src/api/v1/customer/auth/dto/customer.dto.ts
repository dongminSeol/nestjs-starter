import { BaseDto } from '../../../../../base/base.dto';
import { CustomerEntity } from '../repository/customer.entity';

export class CustomerDto extends BaseDto {
  constructor(customer: CustomerEntity) {
    super(customer);
  }
}
