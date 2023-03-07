import {AxiosError} from 'axios';

interface ErrorData {
  error: string;
  message: string;
  statusCode: number;
}

export type CommonError = AxiosError<ErrorData>;

export interface Pagination<T> {
  meta: PaginationMeta;
  data: T[];
}

interface PaginationMeta {
  count: number;
  hasMore: boolean;
}

export interface PaginationParams {
  after?: string;
  count?: number;
}
