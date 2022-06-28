import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback } from "react";

const PASTERS = [
  "高橋　潤　牧師",
  "山森　風花　伝道師",
  "近藤　勝彦　牧師",
  "中村　謙一　牧師",
  "長村　亮介　牧師",
  "種房　正勝　牧師",
];

export const PasterPicker: React.FC<{
  id: string;
  value: string;
  onChange: (val: string) => void;
}> = ({ id, value, onChange }) => {
  const _onChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "16px",
      }}
    >
      <InputLabel id={`${id}-label`}>説教者</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label="Paster"
        onChange={_onChange}
      >
        {PASTERS.map((v, idx) => (
          <MenuItem key={idx} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
