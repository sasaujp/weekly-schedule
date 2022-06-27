import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { NextPage } from "next";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { add } from "date-fns";
import {
  useCombine,
  useEveningHTML,
  usePrimaryHTML,
  useSecondaryHTML,
  useThursdayHTML,
  useTuesdayHTML,
  useWednesdayHTML,
  useWeekDayHTML,
} from "../components/hooks/useHTML";

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
  const isFirstSunday = useMemo(() => {
    if (!value || value.getDay() !== 0) {
      return false;
    }
    return value.getDate() <= 7;
  }, [value]);

  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [paster, setPaster] = useState<string>("");
  const [bible, setBible] = useState<string>("");
  const [psalms, setPsalms] = useState<string>("");
  const [song1, setSong1] = useState<string>("");
  const [song2, setSong2] = useState<string>("");
  const primaryHTML = usePrimaryHTML(
    url,
    title,
    paster,
    bible,
    psalms,
    song1,
    song2
  );
  const [title2, setTitle2] = useState<string>("");
  const [paster2, setPaster2] = useState<string>("");
  const [bible2, setBible2] = useState<string>("");
  const [song21, setSong21] = useState<string>("");
  const [song22, setSong22] = useState<string>("");
  const onChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setTitle2(title);
        setPaster2(paster);
        setBible2(bible);
        setSong21(song1);
        setSong22(song2);
      } else {
        setTitle2("");
        setPaster2("");
        setBible2("");
        setSong21("");
        setSong22("");
      }
    },
    [
      bible,
      paster,
      setBible2,
      setPaster2,
      setSong21,
      setSong22,
      song1,
      song2,
      title,
    ]
  );
  const secondaryHTML = useSecondaryHTML(
    title2,
    paster2,
    bible2,
    song21,
    song22
  );

  const [title3, setTitle3] = useState<string>("");
  const [paster3, setPaster3] = useState<string>("");
  const [bible3, setBible3] = useState<string>("");
  const [song31, setSong31] = useState<string>("");
  const [song32, setSong32] = useState<string>("");
  const onChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "none") {
        setTitle3("");
        setPaster3("");
        setBible3("");
        setSong31("");
        setSong32("");
      } else if (e.target.value === "primary") {
        setTitle3(title);
        setPaster3(paster);
        setBible3(bible);
        setSong31(song1);
        setSong32(song2);
      } else if (e.target.value === "secondary") {
        setTitle3(title2);
        setPaster3(paster2);
        setBible3(bible2);
        setSong31(song21);
        setSong32(song22);
      }
    },
    [
      bible,
      bible2,
      paster,
      paster2,
      song1,
      song2,
      song21,
      song22,
      title,
      title2,
    ]
  );

  const eveningHTML = useEveningHTML(
    title3,
    paster3,
    bible3,
    paster,
    song31,
    song32
  );

  const html = useCombine(
    primaryHTML,
    secondaryHTML,
    eveningHTML,
    isFirstSunday
  );

  const onCopySundayProgram = useCallback(() => {
    navigator.clipboard.writeText(html);
    setNotice("日曜日のプログラム");
    setOpen(true);
  }, [html]);

  const onCopySunday = useCallback(() => {
    if (!value) {
      return;
    }
    const text = `${value.getFullYear()}年${
      value.getMonth() + 1
    }月${value.getDate()}日（日）`;
    navigator.clipboard.writeText(text);
    setNotice(text);
    setOpen(true);
  }, [value]);

  const [weekday, setWeekday] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [study1, setStudy1] = useState<string>("");
  const [study2, setStudy2] = useState<string>("");
  const [open, setOpen] = React.useState(true);
  const [notice, setNotice] = React.useState("");

  const mondayHTML = useWeekDayHTML(weekday[1]);
  const tuesdayHTML = useTuesdayHTML(weekday[2], study1);
  const wednesdayHTML = useWednesdayHTML(weekday[3]);
  const thursdayHTML = useThursdayHTML(weekday[4], study2);
  const fridayHTML = useWeekDayHTML(weekday[5]);
  const saturdayHTML = useWeekDayHTML(weekday[6]);

  const weekdayHTML: { [key: number]: string } = {
    1: mondayHTML,
    2: tuesdayHTML,
    3: wednesdayHTML,
    4: thursdayHTML,
    5: fridayHTML,
    6: saturdayHTML,
  };

  return (
    <>
      <Grid
        container
        spacing="8px"
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        <Grid
          item
          sx={{
            overflowY: "scroll",
            maxHeight: "calc(100vh - 32px)",
          }}
        >
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
            {isFirstSunday && <Typography>第一日曜日です</Typography>}
          </FormWrapper>
          {value && value.getDay() !== 0 && (
            <Typography color="red">日曜日を選択してください</Typography>
          )}
          {value && value.getDay() === 0 && (
            <>
              {/* <FormWrapper label="教会歴">
                <TextField fullWidth placeholder="聖霊降臨後第4主日" />
              </FormWrapper> */}
              <SectionWrapper label="主日礼拝の内容">
                <FormWrapper label="配信URL">
                  <TextField
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                    placeholder="https://~"
                  />
                </FormWrapper>
                <FormWrapper label="交読詩篇">
                  <TextField
                    value={psalms}
                    onChange={(e) => setPsalms(e.target.value)}
                    fullWidth
                    placeholder="122編1-5節（旧約聖書(新共同訳)969頁）"
                  />
                </FormWrapper>
                <FormWrapper label="説教題">
                  <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    placeholder="おはようと言われる主"
                  ></TextField>
                </FormWrapper>

                <FormWrapper label="説教者">
                  <TextField
                    value={paster}
                    onChange={(e) => setPaster(e.target.value)}
                    fullWidth
                    placeholder="髙橋　潤　牧師"
                  />
                </FormWrapper>
                <FormWrapper label="聖書箇所">
                  <TextField
                    value={bible}
                    onChange={(e) => setBible(e.target.value)}
                    fullWidth
                    placeholder="創世記　27章18-29節"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌1">
                  <TextField
                    value={song1}
                    onChange={(e) => setSong1(e.target.value)}
                    fullWidth
                    placeholder="249（われつみびとの　かしらなれども）"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌2">
                  <TextField
                    value={song2}
                    onChange={(e) => setSong2(e.target.value)}
                    fullWidth
                    placeholder="270（信仰こそ旅路を　みちびく杖）"
                  />
                </FormWrapper>
              </SectionWrapper>
              <SectionWrapper label="第二礼拝の内容">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={onChangeCheckbox} />}
                    label="主日礼拝と同じ"
                  />
                </FormGroup>
                <FormWrapper label="説教題">
                  <TextField
                    value={title2}
                    onChange={(e) => setTitle2(e.target.value)}
                    fullWidth
                    placeholder="おはようと言われる主"
                  />
                </FormWrapper>
                <FormWrapper label="説教者">
                  <TextField
                    value={paster2}
                    onChange={(e) => setPaster2(e.target.value)}
                    fullWidth
                    placeholder="髙橋　潤　牧師"
                  />
                </FormWrapper>
                <FormWrapper label="聖書箇所">
                  <TextField
                    value={bible2}
                    onChange={(e) => setBible2(e.target.value)}
                    fullWidth
                    placeholder="創世記　27章18-29節"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌1">
                  <TextField
                    value={song21}
                    onChange={(e) => setSong21(e.target.value)}
                    fullWidth
                    placeholder="249（われつみびとの　かしらなれども）"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌2">
                  <TextField
                    value={song22}
                    onChange={(e) => setSong22(e.target.value)}
                    fullWidth
                    placeholder="270（信仰こそ旅路を　みちびく杖）"
                  />
                </FormWrapper>
              </SectionWrapper>
              <SectionWrapper label="夕礼拝の内容">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  defaultValue="none"
                  onChange={onChangeRadio}
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
                    value="secondary"
                    control={<Radio />}
                    label="第二礼拝と同じ"
                  />
                </RadioGroup>
                <FormWrapper label="説教題">
                  <TextField
                    value={title3}
                    onChange={(e) => setTitle3(e.target.value)}
                    fullWidth
                    placeholder="おはようと言われる主"
                  />
                </FormWrapper>
                <FormWrapper label="説教者">
                  <TextField
                    value={paster3}
                    onChange={(e) => setPaster3(e.target.value)}
                    fullWidth
                    placeholder="髙橋　潤　牧師"
                  />
                </FormWrapper>
                <FormWrapper label="聖書箇所">
                  <TextField
                    value={bible3}
                    onChange={(e) => setBible3(e.target.value)}
                    fullWidth
                    placeholder="創世記　27章18-29節"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌1">
                  <TextField
                    value={song31}
                    onChange={(e) => setSong31(e.target.value)}
                    fullWidth
                    placeholder="249（われつみびとの　かしらなれども）"
                  />
                </FormWrapper>
                <FormWrapper label="讃美歌2">
                  <TextField
                    value={song32}
                    onChange={(e) => setSong32(e.target.value)}
                    fullWidth
                    placeholder="270（信仰こそ旅路を　みちびく杖）"
                  />
                </FormWrapper>
              </SectionWrapper>
            </>
          )}
          {value && value.getDay() === 0 && (
            <SectionWrapper label="平日の予定">
              <>
                {dates.map((d, idx) => {
                  const v = weekday[d.getDay()];
                  const onChange = (newValue: string) => {
                    setWeekday({ ...weekday, ...{ [d.getDay()]: newValue } });
                  };
                  return (
                    <FormWrapper
                      key={idx}
                      label={`${d.getMonth() + 1}月${d.getDate()}日(${
                        WeekDays[d.getDay()]
                      })の聖書`}
                    >
                      <TextField
                        value={v}
                        onChange={(e) => onChange(e.target.value)}
                        fullWidth
                        placeholder="創世記　27章18-29節"
                      />
                    </FormWrapper>
                  );
                })}
                <FormWrapper label="聖書講義(火)の聖書">
                  <TextField
                    value={study1}
                    onChange={(e) => setStudy1(e.target.value)}
                    fullWidth
                    placeholder="創世記　27章18-29節"
                  />
                </FormWrapper>
                <FormWrapper label="聖書講義(木)の聖書">
                  <TextField
                    value={study2}
                    onChange={(e) => setStudy2(e.target.value)}
                    fullWidth
                    placeholder="創世記　27章18-29節"
                  />
                </FormWrapper>
              </>
            </SectionWrapper>
          )}
        </Grid>
        {value && value.getDay() === 0 && (
          <Grid
            item
            sx={{
              overflowY: "scroll",
              maxHeight: "calc(100vh - 32px)",
            }}
          >
            {value && (
              <Card sx={{ padding: "16px" }}>
                <Typography>
                  {value.getFullYear()}年{value.getMonth() + 1}月
                  {value.getDate()}
                  日（日）
                </Typography>
                <Button variant="contained" onClick={onCopySunday}>
                  コピーする
                </Button>
              </Card>
            )}

            <Card sx={{ marginTop: "16px", padding: "16px" }}>
              <p
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
              <Button variant="contained" onClick={onCopySundayProgram}>
                コピーする
              </Button>
            </Card>

            {dates.map((d, idx) => {
              const onCopyDate = () => {
                const text = `${d.getFullYear()}年${
                  d.getMonth() + 1
                }月${d.getDate()}日（${WeekDays[d.getDay()]}）`;

                navigator.clipboard.writeText(text);
                setNotice(text);
                setOpen(true);
              };
              const onCopyHTML = () => {
                navigator.clipboard.writeText(weekdayHTML[d.getDay()]);
                setNotice(`${WeekDays[d.getDay()]}曜日のプログラム`);
                setOpen(true);
              };

              return (
                <Card key={idx} sx={{ marginTop: "16px", padding: "16px" }}>
                  <Typography>
                    {d.getFullYear()}年{d.getMonth() + 1}月{d.getDate()}
                    日（{WeekDays[d.getDay()]}）
                  </Typography>
                  <Button variant="contained" onClick={onCopyDate}>
                    コピーする
                  </Button>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: weekdayHTML[d.getDay()],
                    }}
                  />
                  <Button variant="contained" onClick={onCopyHTML}>
                    コピーする
                  </Button>
                </Card>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Snackbar
        autoHideDuration={6000}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="success">「{notice}」コピーしました。</Alert>
      </Snackbar>
    </>
  );
};

export default Home;
