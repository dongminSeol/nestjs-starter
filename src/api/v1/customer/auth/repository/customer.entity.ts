import { BaseAbstractEntity } from '../../../../../base/base.abstract.entity';
import { CustomerDto } from '../dto/customer.dto';

export class CustomerEntity extends BaseAbstractEntity<CustomerDto> {
  name: string;
  phone: string;
  birth: string;
  nickName: string;
  images: CustomerProfileImageEntity;
}

export class CustomerProfileImageEntity extends BaseAbstractEntity<CustomerDto> {
  originalUrl: string;
  resizedUrl: string;
  thumbnailUrl: string;
}
