import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input } from "@/app/_components/ui/input";

export const MoneyInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
