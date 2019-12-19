import React from 'react';
import { IFormState, IValues } from '../core/Form';
import { IErrorContext } from './error';

export interface IFormContext extends IFormState {
  setValues: (values: IValues) => void;
  validate: (fieldName: string) => void; 
  serverError: IErrorContext
}

export default React.createContext<IFormContext | undefined>(
  undefined
);