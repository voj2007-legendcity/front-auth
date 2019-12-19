import React from "react";
import FormContext,  {IFormContext } from '../context/form';
import { IValidation, getError, getEditorStyle } from './Validation';
// i18
import { useTranslation } from 'react-i18next';
import { ErrorDataType } from "../context/error";

type Editor = "textbox" | "multilinetextbox" | "dropdown" | "password";

export interface IFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  editor?: Editor;
  options?: string[];
  value?: any;
  validation?: IValidation[];
}

export interface IFields {
  [key: string]: IFieldProps;
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value,
  placeholder
}) => {
  const { t } = useTranslation();

  return (
    <FormContext.Consumer> 
      {(context: IFormContext | undefined) => {
        const contextData = (context!.serverError.data as ErrorDataType[]);

        return (
          <div className="form-group">
            {label && <label htmlFor={id}>{t(label)}</label>}

            {editor!.toLowerCase() === "textbox" && (
              <input
                id={id}
                type="text"
                value={value}
                placeholder={placeholder && t(placeholder)}
                style={getEditorStyle(id, context!.errors, contextData)} 
                onChange={(e: React.FormEvent<HTMLInputElement>) => context!.setValues({ [id]: e.currentTarget.value })}
                onBlur={(e: React.FormEvent<HTMLInputElement>) => context!.validate(id)}
                className="form-control"
              />
            )}

            {editor!.toLowerCase() === "password" && (
              <input
                id={id}
                type="password"
                value={value}
                placeholder={placeholder && t(placeholder)}
                style={getEditorStyle(id, context!.errors, contextData)} 
                onChange={(e: React.FormEvent<HTMLInputElement>) => context!.setValues({ [id]: e.currentTarget.value })}
                onBlur={(e: React.FormEvent<HTMLInputElement>) => context!.validate(id)}
                className="form-control"
              />
            )}

            {editor!.toLowerCase() === "multilinetextbox" && (
              <textarea
                id={id}
                value={value}
                placeholder={placeholder && t(placeholder)}
                style={getEditorStyle(id, context!.errors, contextData)} 
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => context!.setValues({ [id]: e.currentTarget.value })}
                onBlur={(e: React.FormEvent<HTMLTextAreaElement>) => context!.validate(id)}
                className="form-control"
              />
            )}

            {editor!.toLowerCase() === "dropdown" && (
              <select
                id={id}
                name={id}
                value={value}
                style={getEditorStyle(id, context!.errors, contextData)} 
                onChange={(e: React.FormEvent<HTMLSelectElement>) => context!.setValues({ [id]: e.currentTarget.value })}
                onBlur={(e: React.FormEvent<HTMLSelectElement>) => context!.validate(id)}
                className="form-control"
              >
                {options && options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {getError(id, context!.errors, contextData).length > 0 && (
              <div style={{ color: "red", fontSize: "80%" }}>
                <p>{getError(id, context!.errors, contextData).map((msg: string): string => t(msg)).join(' ')}</p>
              </div>
            )}
          </div>
        )
      }
    }
    </FormContext.Consumer>
  );
};
Field.defaultProps = {
  editor: "textbox"
};