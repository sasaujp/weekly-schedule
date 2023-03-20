import {
  Alert,
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { add } from "date-fns";
import {
  BookType,
  useThursdayHTML,
  useTuesdayHTML,
  useWednesdayHTML,
  useWeekDayHTML,
} from "../components/hooks/useHTML";
import { BiblePartSelector } from "../components/BookSelector";
import { useRecoilState } from "recoil";
import * as inputs from "../components/InputValues";
import { useSundayProgram } from "../components/SundayProgram";
import { FormWrapper, SectionWrapper } from "../components/misc";
import {
  useApiKey,
  useWeekdayStream,
  useStreamHistory,
} from "../components/Stream";
import { useJapaneseHolidays } from "../components/hooks/useJapaneseHolidays";

const WeekDays: { [key: number]: string } = {
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
};

const Home: NextPage = () => {
  const [date, setDate] = useRecoilState(inputs.dateState);
  const [value, setValue] = useState<Date | null>(null);
  useEffect(() => {
    if (date) {
      setValue(new Date(date));
    }
  }, [date]);
  const dates: Date[] = useMemo(() => {
    if (!value) {
      return [];
    }
    return [
      add(value, {
        days: 1,
      }),
      add(value, {
        days: 2,
      }),
      add(value, {
        days: 3,
      }),
      add(value, {
        days: 4,
      }),
      add(value, {
        days: 5,
      }),
      add(value, {
        days: 6,
      }),
    ];
  }, [value]);
  const [show, setShow] = useState("main");
  const isFirstOrThirdTuesday = useMemo(() => {
    const tuesday = dates[1];
    if (!tuesday) {
      return false;
    }
    const date = tuesday.getDate();
    return date <= 7 || (date >= 15 && date <= 21);
  }, [dates]);
  const [open, setOpen] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  const sunday1 = useSundayProgram(value, inputs.sunday1, setNotice, setOpen);
  const sunday2 = useSundayProgram(
    value && add(value, { days: 7 }),
    inputs.sunday2,
    setNotice,
    setOpen
  );

  const [weekday, setWeekday] = useRecoilState(inputs.weekdayState);
  const [study1, setStudy1] = useRecoilState(inputs.study1State);
  const [study2, setStudy2] = useRecoilState(inputs.study2State);
  const holidays = useJapaneseHolidays(dates);
  const { handleOpen: studyStreamHandleOpen, body: studyStreamBody } =
    useWeekdayStream(
      holidays[1] ? dates[1] : null,
      holidays[3] ? dates[3] : null,
      study1,
      study2,
      inputs.tuesdayUrlState,
      inputs.thursdayUrlState,
      setOpen,
      setNotice
    );
  const { handleOpen: streamHistoryHandleOpen, body: streamHistoryBody } =
    useStreamHistory();

  const [book, setBook] = useRecoilState(inputs.tutorialBookState);
  const [bookPages, setBookPages] = useRecoilState(
    inputs.tutorialBookPageState
  );

  const mondayHTML = useWeekDayHTML(weekday[1], holidays[0] !== undefined);
  const tuesdayHTML = useTuesdayHTML(
    weekday[2],
    study1,
    isFirstOrThirdTuesday,
    book,
    bookPages,
    holidays[1] !== undefined
  );
  const wednesdayHTML = useWednesdayHTML(weekday[3], holidays[2] !== undefined);
  const thursdayHTML = useThursdayHTML(
    weekday[4],
    study2,
    holidays[3] !== undefined
  );
  const fridayHTML = useWeekDayHTML(weekday[5], holidays[4] !== undefined);
  const saturdayHTML = useWeekDayHTML(weekday[6], holidays[5] !== undefined);

  const weekdayHTML: { [key: number]: string } = {
    1: mondayHTML,
    2: tuesdayHTML,
    3: wednesdayHTML,
    4: thursdayHTML,
    5: fridayHTML,
    6: saturdayHTML,
  };
  const onNextWeek = useCallback(() => {
    const result = window.confirm(
      "次の週にして、次主日の予定を今週にコピーします。よろしいですか？"
    );
    if (result && value) {
      setDate(
        add(value, {
          days: 7,
        })
      );
      sunday1.setValues(sunday2.values);
    }
  }, [setDate, sunday1, sunday2.values, value]);
  const { handleOpen, body } = useApiKey();
  return (
    <>
      <Button
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
        onClick={handleOpen}
        variant="contained"
      >
        あいことば
      </Button>

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
          <FormWrapper label="基準の日曜日">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <DatePicker
                value={value}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                showDaysOutsideCurrentMonth
                renderInput={(params) => <TextField {...params} />}
              />
              {value && (
                <Button
                  onClick={onNextWeek}
                  sx={{
                    marginLeft: "16px",
                  }}
                  variant="contained"
                >
                  次の週にする
                </Button>
              )}
            </Box>
          </FormWrapper>
          <FormWrapper label="表示内容">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="next"
              onChange={(e) => {
                setShow(e.target.value);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                value="main"
                control={<Radio />}
                label="主日の予定"
              />
              <FormControlLabel
                value="weekday"
                control={<Radio />}
                label="平日の予定"
              />
              <FormControlLabel
                value="next"
                control={<Radio />}
                label="次主日の予定"
              />
            </RadioGroup>
          </FormWrapper>
          {value && value.getDay() !== 0 && (
            <Typography color="red">日曜日を選択してください</Typography>
          )}
          {(() => {
            if (!value || value.getDay() !== 0) {
              return null;
            }
            return (
              <>
                {show === "main" && sunday1.form}
                {show === "weekday" && (
                  <SectionWrapper label="平日の予定">
                    <>
                      <Button onClick={studyStreamHandleOpen}>配信URL</Button>
                      <Button onClick={streamHistoryHandleOpen}>
                        過去の配信URL
                      </Button>

                      {isFirstOrThirdTuesday && (
                        <Typography>第一・三火曜日です</Typography>
                      )}

                      {dates.map((d, idx) => {
                        const v = weekday[d.getDay()];

                        const onBeforeDay = () => {
                          const value = { ...weekday[d.getDay() - 1] };
                          value.chapter = value.chapterTo;
                          value.verseTo = value.verseFrom = (
                            parseInt(value.verseTo) + 1
                          ).toString();
                          setWeekday({
                            ...weekday,
                            ...{ [d.getDay()]: value },
                          });
                        };

                        const onChange = (newValue: BookType) => {
                          setWeekday({
                            ...weekday,
                            ...{ [d.getDay()]: newValue },
                          });
                        };
                        return (
                          <FormWrapper
                            key={idx}
                            label={`${d.getMonth() + 1}月${d.getDate()}日(${
                              WeekDays[d.getDay()]
                            })の聖書`}
                            description={holidays[idx]}
                          >
                            {idx !== 0 && (
                              <Button variant="text" onClick={onBeforeDay}>
                                前の日の続き
                              </Button>
                            )}
                            <BiblePartSelector
                              book={v}
                              onChange={(val) => {
                                onChange(val);
                              }}
                            />
                          </FormWrapper>
                        );
                      })}
                      <FormWrapper label="聖書講義(火)の聖書">
                        <BiblePartSelector
                          book={study1}
                          onChange={(val) => {
                            setStudy1(val);
                          }}
                        />
                      </FormWrapper>
                      <FormWrapper label="聖書講義(木)の聖書">
                        <BiblePartSelector
                          book={study2}
                          onChange={(val) => {
                            setStudy2(val);
                          }}
                        />
                      </FormWrapper>
                      {isFirstOrThirdTuesday && (
                        <FormWrapper label="入門講座の内容">
                          <TextField
                            value={book}
                            onChange={(e) => setBook(e.target.value)}
                            fullWidth
                            placeholder="改めて学ぶ、教団信仰告白"
                          />
                          <TextField
                            type="number"
                            value={bookPages}
                            onChange={(e) => setBookPages(e.target.value)}
                            fullWidth
                            placeholder="117"
                          />
                        </FormWrapper>
                      )}
                    </>
                  </SectionWrapper>
                )}
                {show === "next" && sunday2.form}
              </>
            );
          })()}
        </Grid>
        {value && value.getDay() === 0 && (
          <Grid
            item
            sx={{
              overflowY: "scroll",
              maxHeight: "calc(100vh - 32px)",
            }}
          >
            {show === "main" && sunday1.copy}
            {show === "weekday" &&
              dates.map((d, idx) => {
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
            {show === "next" && sunday2.copy}
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
      {body}
      {studyStreamBody}
      {streamHistoryBody}
    </>
  );
};

export default Home;
