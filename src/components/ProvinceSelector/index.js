import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";

export default function ProvinceSelector({ value, handleOnChange, provinces}) {
    return (
        <FormControl>
            <InputLabel shrink htmlFor="province-selector">
              Tỉnh
            </InputLabel>
            <NativeSelect
              value={value}
              onChange={handleOnChange}
              inputProps={{
                  name: 'province',
                  id: 'province-selector'
              }}
            >
              {
                provinces.map(item => {
                    return (
                        <option key={item}>{item}</option>
                    )
                })
              }
            </NativeSelect>
        </FormControl>
    )
}