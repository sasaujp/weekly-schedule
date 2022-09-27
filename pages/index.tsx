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
import { BookNumberInput, BookSelector } from "../components/BookSelector";
import { useRecoilState } from "recoil";
import * as inputs from "../components/InputValues";
import { useSundayProgram } from "../components/sundayProgram";
import { FormWrapper, SectionWrapper } from "../components/misc";

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
  const [book, setBook] = useRecoilState(inputs.tutorialBookState);
  const [bookPages, setBookPages] = useRecoilState(
    inputs.tutorialBookPageState
  );

  const mondayHTML = useWeekDayHTML(weekday[1]);
  const tuesdayHTML = useTuesdayHTML(
    weekday[2],
    study1,
    isFirstOrThirdTuesday,
    book,
    bookPages
  );
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
              defaultValue="main"
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
                      {isFirstOrThirdTuesday && (
                        <Typography>第一・三火曜日です</Typography>
                      )}

                      {dates.map((d, idx) => {
                        const v = weekday[d.getDay()];

                        const onBeforeDay = () => {
                          const value = { ...weekday[d.getDay() - 1] };
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
                          >
                            {idx !== 0 && (
                              <Button variant="text" onClick={onBeforeDay}>
                                前の日の続き
                              </Button>
                            )}
                            <BookSelector
                              book={v.book}
                              onChange={(val) => {
                                onChange({ ...v, book: val });
                              }}
                            />
                            <BookNumberInput
                              chapter={v.chapter}
                              onChangeChapter={(val) => {
                                onChange({ ...v, chapter: val });
                              }}
                              verseFrom={v.verseFrom}
                              onChangeVerseFrom={(val) => {
                                onChange({ ...v, verseFrom: val });
                              }}
                              verseTo={v.verseTo}
                              onChangeVerseTo={(val) => {
                                onChange({ ...v, verseTo: val });
                              }}
                            />
                          </FormWrapper>
                        );
                      })}
                      <FormWrapper label="聖書講義(火)の聖書">
                        <BookSelector
                          book={study1.book}
                          onChange={(val) => {
                            setStudy1({ ...study1, book: val });
                          }}
                        />
                        <BookNumberInput
                          chapter={study1.chapter}
                          onChangeChapter={(val) => {
                            setStudy1({ ...study1, chapter: val });
                          }}
                          verseFrom={study1.verseFrom}
                          onChangeVerseFrom={(val) => {
                            setStudy1({ ...study1, verseFrom: val });
                          }}
                          verseTo={study1.verseTo}
                          onChangeVerseTo={(val) => {
                            setStudy1({ ...study1, verseTo: val });
                          }}
                        />
                      </FormWrapper>
                      <FormWrapper label="聖書講義(木)の聖書">
                        <BookSelector
                          book={study2.book}
                          onChange={(val) => {
                            setStudy2({ ...study2, book: val });
                          }}
                        />
                        <BookNumberInput
                          chapter={study2.chapter}
                          onChangeChapter={(val) => {
                            setStudy2({ ...study2, chapter: val });
                          }}
                          verseFrom={study2.verseFrom}
                          onChangeVerseFrom={(val) => {
                            setStudy2({ ...study2, verseFrom: val });
                          }}
                          verseTo={study2.verseTo}
                          onChangeVerseTo={(val) => {
                            setStudy2({ ...study2, verseTo: val });
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
    </>
  );
};

export default Home;
