import { BaseAbstractEntity } from '../../../../../base/base.abstract.entity';
import { MomentDto } from '../dto/moment.dto';
import { CustomerEntity } from '../../auth/repository/customer.entity';

export class MomentEntity extends BaseAbstractEntity<MomentDto> {
  title: string;
  type: string;
  text: string;
  images: MomentImagesEntity;
  Videos: MomentVideoEntity;
  places: MomentPlaceEntity;
  customer: CustomerEntity;
}

export class MomentImagesEntity extends BaseAbstractEntity<MomentDto> {
  originalUrl: string;
  resizedUrl: string;
  thumbnailUrl: string;
}

export class MomentVideoEntity extends BaseAbstractEntity<MomentDto> {
  originalVideoUrl: string;
  resizedVideoUrl: string;
  thumbnailVideoUrl: string;
}

export class MomentPlaceEntity extends BaseAbstractEntity<MomentDto> {
  address: string;
  coordinate: number;
}
