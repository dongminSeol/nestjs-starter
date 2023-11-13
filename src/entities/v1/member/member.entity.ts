export class MemberEntity {
  id: number;
  user_id: string;
  user_name: string;
  member_type: string;
  email: string;
  auth_type: string;
  mobile_number: string;
  status_message: string;
  profile_image_url?: string;
  is_agreed_privacy_policy: boolean;
  is_agreed_service_terms: boolean;
  is_completed: boolean;
  updated_at: string;
  created_at: string;
}

export class MemberProcedureOutput {
  message: string;
  row_count: number;
}
