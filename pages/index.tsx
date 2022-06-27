import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { NextPage } from "next";
import { ReactNode, useMemo, useState } from "react";
import { add } from "date-fns";

const WeekDays: { [key: number]: string } = {
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
};
const SectionWrapper: React.FC<{ label: string; children?: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Card sx={{ marginTop: "16px", padding: "16px" }}>
      <Typography variant="h6">{label}</Typography>
      <Box sx={{ paddingLeft: "16px" }}>{children}</Box>
    </Card>
  );
};

const FormWrapper: React.FC<{ label: string; children?: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Box marginTop="16px">
      <Typography>{label}</Typography>
      {children}
    </Box>
  );
};

const Home: NextPage = () => {
  const [value, setValue] = useState<Date | null>(null);

  const dates: Date[] = useMemo(() => {
    if (!value) {
      return [];
    }
    return [
      add(value, {
        days: -6,
      }),
      add(value, {
        days: -5,
      }),
      add(value, {
        days: -4,
      }),
      add(value, {
        days: -3,
      }),
      add(value, {
        days: -2,
      }),
      add(value, {
        days: -1,
      }),
    ];
  }, [value]);
  console.log(dates);
  return (
    <>
      <div>各種項目を入力してください</div>
      <FormWrapper label="基準の日曜日">
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          showDaysOutsideCurrentMonth
          renderInput={(params) => <TextField {...params} />}
        />
      </FormWrapper>
      {value && value.getDay() !== 0 && (
        <Typography color="red">日曜日を選択してください</Typography>
      )}
      {value && value.getDay() === 0 && (
        <>
          <FormWrapper label="教会歴"></FormWrapper>
          <SectionWrapper label="主日礼拝の内容">
            <FormWrapper label="配信URL">
              <TextField fullWidth placeholder="https://~"></TextField>
            </FormWrapper>
            <FormWrapper label="交読詩篇"></FormWrapper>
            <FormWrapper label="説教題">
              <TextField
                fullWidth
                placeholder="おはようと言われる主"
              ></TextField>
            </FormWrapper>

            <FormWrapper label="説教者"></FormWrapper>
            <FormWrapper label="聖書箇所"></FormWrapper>
            <FormWrapper label="讃美歌1"></FormWrapper>
            <FormWrapper label="讃美歌2"></FormWrapper>
          </SectionWrapper>
          <SectionWrapper label="第二礼拝の内容">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="主日礼拝と同じ" />
            </FormGroup>
            <FormWrapper label="説教題">
              <TextField
                fullWidth
                placeholder="おはようと言われる主"
              ></TextField>
            </FormWrapper>
            <FormWrapper label="説教者"></FormWrapper>
            <FormWrapper label="聖書箇所"></FormWrapper>
            <FormWrapper label="讃美歌1"></FormWrapper>
            <FormWrapper label="讃美歌2"></FormWrapper>
          </SectionWrapper>
          <SectionWrapper label="夕礼拝の内容">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="none"
            >
              <FormControlLabel
                value="none"
                control={<Radio />}
                label="同じではない"
              />
              <FormControlLabel
                value="primary"
                control={<Radio />}
                label="主日礼拝と同じ"
              />
              <FormControlLabel
                value="sub"
                control={<Radio />}
                label="第二礼拝と同じ"
              />
            </RadioGroup>
            <FormWrapper label="説教題">
              <TextField
                fullWidth
                placeholder="おはようと言われる主"
              ></TextField>
            </FormWrapper>
            <FormWrapper label="説教者"></FormWrapper>
            <FormWrapper label="聖書箇所"></FormWrapper>
            <FormWrapper label="讃美歌1"></FormWrapper>
            <FormWrapper label="讃美歌2"></FormWrapper>
          </SectionWrapper>
        </>
      )}
      {value && value.getDay() === 0 && (
        <SectionWrapper label="平日の予定">
          <>
            {dates.map((d, idx) => {
              return (
                <FormWrapper
                  key={idx}
                  label={`${d.getMonth() + 1}月${d.getDate()}日(${
                    WeekDays[d.getDay()]
                  })の聖書`}
                ></FormWrapper>
              );
            })}
            <FormWrapper label="聖書講義(火)の聖書"></FormWrapper>
            <FormWrapper label="聖書講義(木)の聖書"></FormWrapper>
          </>
        </SectionWrapper>
      )}
    </>
  );
};

export default Home;
