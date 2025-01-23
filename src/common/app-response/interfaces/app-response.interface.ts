interface AppResponseMetadata {
  [key: string]: any;
}

export interface AppResponseMetaPage {
  totalCount: number;
  currPage: number;
  isPrev: boolean;
  isNext: boolean;
}

export interface AppResponse<T> {
  version?: string;
  timestamp?: number;
  meta: AppResponseMetadata | AppResponseMetaPage | null;
  data: T | null;
}
