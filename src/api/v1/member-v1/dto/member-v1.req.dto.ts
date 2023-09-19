import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemberV1CheckDuplicateIdReq {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}


export class MemberV1UpdateProfileReq {
  @IsString()
  @IsOptional()
  user_name

  @IsString()
  @IsOptional()
  mobile_number: string

  @IsString()
  @IsOptional()
  status_message: string;
}
