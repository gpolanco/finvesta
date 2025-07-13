// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ServiceBaseParams {}

export interface ServiceBaseResponse<T> {
  success: boolean;
  data?: T | null;
  error?: string;
}
