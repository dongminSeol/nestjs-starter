import { Expose } from 'class-transformer';

export class MemberProfileRes {
  @Expose()
  user_id: string;

  @Expose()
  email: string;

  @Expose()
  auth_type: string;

  @Expose()
  mobile_number: string;

  @Expose()
  status_message: string;

  @Expose()
  is_agreed_privacy_policy: boolean;

  @Expose()
  is_agreed_service_terms: boolean;

  @Expose()
  updated_at: string;

}

export class MemberCheckDuplicateIdRes {
  @Expose()
  is_duplicate: boolean;
}
