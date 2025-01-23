export class MemberCustomerEntity {
  id: number;
  type: string;
  name: string;
  nickName: string;
  phone: string;
  birth: string;
  email: string;
  password: string;
  gender: string;
  provider: string;
  profileUrl: string;
  socialId: string | null;
  socialName: string | null;
  identityCode: string | null;
  isOnboarding: boolean;
  isServicePolicyKhub: boolean;
  isServicePolicyMedicalUser: boolean;
  isServicePolicyCounselingUser: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isBlock: boolean;
  blockDescription: string;
}
