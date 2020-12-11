import React, {
  InputHTMLAttributes,
  FunctionComponent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import Input from "./Input";

export interface ReturnValue {
  formattedValue: string;
  floatValue: number;
}

export interface InputAmountProps {
  onValueChange?: (value: ReturnValue) => void;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  integerScale?: number;
  prefix?: string;
  suffix?: string;
  value?: string;
}

const InputAmount: FunctionComponent<
  InputAmountProps & InputHTMLAttributes<HTMLInputElement>
> = ({
  onValueChange = (value) => value,
  value: controlledValue = "",
  thousandSeparator = ",",
  decimalSeparator = ".",
  name = "input-number",
  integerScale = 14,
  decimalScale = 2,
  prefix = "",
  suffix = "",
  ...inputProps // InputHTMLAttributes<HTMLInputElement>
}) => {
  const [value, setValue] = useState<string>("");

  const setValueAndReturn = (
    inputValue: string,
    update = true
  ): ReturnValue => {
    const toFloatValue = (rawValue: string): number => {
      // converts to number
      const valueAsNumber = Number(
        rawValue
          // eliminates all non-digits
          .replace(/\D/g, "")
          // limit its length to 16 (avoids scientific notations like: 1e+25)
          .slice(0, 16)
          // Slice to its integerScale
          .slice(0, integerScale + decimalScale)
      );
      // then divides by it's the decimal scale, since we remove all non-digits (including the decimal separator)
      return valueAsNumber / 10 ** decimalScale;
    };

    const toFormattedValue = (rawValue: number): string => {
      const valueFormatted = rawValue
        // cuts the extra decimals and converts to string
        .toFixed(decimalScale)
        // replaces default decimalSeparator
        .replace(".", decimalSeparator)
        // finally inserts thousandSeparator
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandSeparator}`);

      return `${prefix}${valueFormatted}${suffix}`;
    };

    const floatValue = toFloatValue(inputValue);
    const formattedValue = toFormattedValue(floatValue);
    if (update) {
      setValue(formattedValue);
    }

    return {
      formattedValue,
      floatValue,
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // set and call change
    onValueChange(setValueAndReturn(e.target.value));
  };

  useEffect(() => {
    // fill on mount
    setValueAndReturn(controlledValue);
  }, [
    thousandSeparator,
    decimalSeparator,
    integerScale,
    decimalScale,
    prefix,
    suffix,
  ]);

  useEffect(() => {
    const setCursor = (): void => {
      if (suffix.length > 0) {
        const inputElem = document.getElementById(name) as HTMLInputElement;
        if (inputElem != null) {
          const position = value.length - suffix.length;
          inputElem.setSelectionRange(position, position);
        }
      }
    };

    window.addEventListener("keydown", setCursor);
    return () => window.removeEventListener("keydown", setCursor);
  }, [value]);

  return (
    <Input
      {...inputProps} // this goes first so do not replaces anything
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      name={name}
      id={name}
    />
  );
};

export default InputAmount;
