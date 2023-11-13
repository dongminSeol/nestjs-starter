import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemberCheckDuplicateIdReq {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}


export class MemberUpdateProfileReq {
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
