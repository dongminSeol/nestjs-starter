

export class MomentContentEntity {
  id: number;
  mk_id: number;
  updated_at: string;
  created_at: string;
  content_type: Record<any, any>;
  image_content: Record<any, any>;
  video_content: Record<any, any>;
  text: string;
  action_date: Date;
  place: Record<any, any>;
}



export class MomentContentGoodEntity {
  id: number;
  mk_id: number;
  updated_at: string;
  created_at: string;
}

export class MomentContentGoodCountEntity {
  count: number;
}


export class MomentContentUserReportEntity {
  id: number;
  mk_id: number;
  updated_at: string;
  created_at: string;
}


export class MomentContentUserShareEntity {
  id: number;
  mk_id: number;
  updated_at: string;
  created_at: string;
}


export class MomentContentReactionEntity {
  id: number;
  mk_id: number;
  mce_id: number;
  updated_at: string;
  created_at: string;
}
