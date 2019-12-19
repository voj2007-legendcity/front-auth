import React from 'react';

export type ErrorDataType = {
  message: string,
  field?: string
}

export interface IErrorContext {
  res: boolean;
  error: boolean;
  message: string;
  data?: ErrorDataType[];
}

export default React.createContext<IErrorContext | undefined>(
  undefined
);