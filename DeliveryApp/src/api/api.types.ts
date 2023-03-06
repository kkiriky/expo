import {AxiosError} from 'axios';

interface ErrorData {
  error: string;
  message: string;
  statusCode: number;
}

export type CommonError = AxiosError<ErrorData>;
