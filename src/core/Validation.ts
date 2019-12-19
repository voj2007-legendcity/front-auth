import { IValues, IErrors } from "./Form";
import { ErrorDataType } from "../context/error";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args?: any) => string;
  args?: any;
}

export const required = (values: IValues, fieldName: string): string => 
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "ERROR.POPULATED"
    : "";

export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "ERROR.EMAIL"
    : "";

export const maxLength = (
  values: IValues,
  fieldName: string,
  args: any
): string =>
  values[fieldName] && values[fieldName].length > args.length
    ? "ERROR.MAX"
    : "";

export const minLength = (
  values: IValues,
  fieldName: string,
  args: any
): string =>
  values[fieldName] && values[fieldName].length < args.length
    ? "ERROR.MIN"
    : "";

export const compare = (
  values: IValues,
  fieldName: string,
  args: any
): string =>
  values[fieldName] !== args.state.values[args.fieldCompare] 
    ? "ERROR.COMPARE"
    : "";

export const getError = (id: string, errors: IErrors, serverError: ErrorDataType[]): string[] => {
  let err: string[] = [];
  
  if(errors[id]){
    err = errors[id].filter((el: string) => {
      return el.trim() !== '';
    });
  }

  if(serverError && serverError.length > 0){
    serverError.find((el): ErrorDataType => {
      if(el.field === id){
        err.push(el.message);
      }
      return el;
    });
  }
  return err;
};

export const getEditorStyle = (id: string, errors: IErrors, serverError: ErrorDataType[]): any => {
  return getError(id, errors, serverError).length > 0 ? { borderColor: "red" } : {}
};