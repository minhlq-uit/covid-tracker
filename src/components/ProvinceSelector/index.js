import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `20px 0`,
    minWidth: 120,
  },
}));

export default function ProvinceSelector({ value, handleOnChange, provinces}) {
    return (
        <FormControl className={useStyles.formControl}>
            <InputLabel shrink htmlFor="province-selector">
              Lựa chọn 1 tỉnh
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