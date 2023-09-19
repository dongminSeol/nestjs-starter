interface AppResponseMetadata {
  [key: string]: any;
}

export interface AppResponse<T> {
  version?: string;
  timestamp?: number;
  language_tag?: string;
  meta?: AppResponseMetadata | null;
  data: T | null;
}
