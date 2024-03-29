import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { BiblePartSelector } from "./BookSelector";
import {
  BookType,
  useCombine,
  useEveningHTML,
  usePrimaryHTML,
  useSecondaryHTML,
} from "./hooks/useHTML";
import { BiblePageType, StreamingUrlType, SundayType } from "./InputValues";
import { FormWrapper, SectionWrapper } from "./misc";
import { PasterPicker } from "./PasterPicker";
import { SongPicker } from "./SongPicker";
import { useStream } from "./Stream";

export type Values = {
  weekNo: number;
  kyoukaireki: string;
  csUrl: StreamingUrlType;
  url: StreamingUrlType;
  biblePage: BiblePageType;
  title: string;
  paster: string;
  bible1: BookType;
  psalms: string;
  song1: string;
  song2: string;
  title2: string;
  paster2: string;
  bible2: BookType;
  song21: string;
  song22: string;
  title3: string;
  paster3: string;
  bible3: BookType;
  song31: string;
  song32: string;
};

export const useSundayProgram = (
  day: Date | null,
  sunday: SundayType,
  setNotice: (val: string) => void,
  setOpen: (val: boolean) => void
): {
  form: React.ReactNode;
  copy: React.ReactNode;
  values: Values;
  setValues: (values: Values) => void;
} => {
  const [weekNo, setWeekNo] = useRecoilState(sunday.weekNoState);
  const [kyoukaireki, setKyoukaireki] = useRecoilState(sunday.kyoukairekiState);
  const [csUrl, setCsUrl] = useRecoilState(sunday.csUrlState);
  const [url, setUrl] = useRecoilState(sunday.urlState);
  const [biblePage, setBiblePage] = useRecoilState(sunday.biblePageState);
  const [title, setTitle] = useRecoilState(sunday.titleState);
  const [paster, setPaster] = useRecoilState(sunday.pasterState);
  const [bible1, setBible1] = useRecoilState(sunday.bibleState1);
  const [psalms, setPsalms] = useRecoilState(sunday.psalmsState);
  const [song1, setSong1] = useRecoilState(sunday.song1State);
  const [song2, setSong2] = useRecoilState(sunday.song2State);

  const [title2, setTitle2] = useRecoilState(sunday.title2State);
  const [paster2, setPaster2] = useRecoilState(sunday.paster2State);
  const [bible2, setBible2] = useRecoilState(sunday.bibleState2);
  const [song21, setSong21] = useRecoilState(sunday.song21State);
  const [song22, setSong22] = useRecoilState(sunday.song22State);

  const [title3, setTitle3] = useRecoilState(sunday.title3State);
  const [paster3, setPaster3] = useRecoilState(sunday.paster3State);
  const [bible3, setBible3] = useRecoilState(sunday.bibleState3);
  const [song31, setSong31] = useRecoilState(sunday.song31State);
  const [song32, setSong32] = useRecoilState(sunday.song32State);

  const stream = useStream(
    day,
    bible1,
    paster,
    title,
    sunday.csUrlState,
    sunday.urlState,
    sunday.biblePageState,
    setOpen,
    setNotice
  );

  const onChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setTitle2(title);
        setPaster2(paster);
        setBible2(bible1);
        setSong21(song1);
        setSong22(song2);
      } else {
        setTitle2("");
        setPaster2("");
        setBible2({
          book: "",
          chapter: "",
          chapterTo: "",
          verseFrom: "",
          verseTo: "",
        });
        setSong21("");
        setSong22("");
      }
    },
    [
      bible1,
      paster,
      setBible2,
      setPaster2,
      setSong21,
      setSong22,
      setTitle2,
      song1,
      song2,
      title,
    ]
  );
  const isFirstSunday = useMemo(() => {
    if (!day || day.getDay() !== 0) {
      return false;
    }
    return day.getDate() <= 7;
  }, [day]);

  const isCsJoint = useMemo(() => {
    if (!day || day.getDay() !== 0) {
      return false;
    }
    return day.getDate() >= 22;
  }, [day]);

  const onChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "none") {
        setTitle3("");
        setPaster3("");
        setBible3({
          book: "",
          chapter: "",
          chapterTo: "",
          verseFrom: "",
          verseTo: "",
        });
        setSong31("");
        setSong32("");
      } else if (e.target.value === "primary") {
        setTitle3(title);
        setPaster3(paster);
        setBible3(bible1);
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
      bible1,
      bible2,
      paster,
      paster2,
      setBible3,
      setPaster3,
      setSong31,
      setSong32,
      setTitle3,
      song1,
      song2,
      song21,
      song22,
      title,
      title2,
    ]
  );
  const primaryHTML = usePrimaryHTML(
    url.url,
    title,
    paster,
    bible1,
    psalms,
    song1,
    song2,
    isCsJoint
  );
  const secondaryHTML = useSecondaryHTML(
    title2,
    paster2,
    bible2,
    song21,
    song22
  );
  const eveningHTML = useEveningHTML(
    title3,
    paster3,
    bible3,
    psalms,
    song31,
    song32
  );

  const html = useCombine(
    primaryHTML,
    secondaryHTML,
    eveningHTML,
    isFirstSunday
  );
  const onCopyWeekNo = useCallback(() => {
    navigator.clipboard.writeText("Week" + weekNo);
    setNotice("Week");
    setOpen(true);
  }, [setNotice, setOpen, weekNo]);

  const onCopyKyoukarireki = useCallback(() => {
    navigator.clipboard.writeText(kyoukaireki);
    setNotice("教会歴");
    setOpen(true);
  }, [kyoukaireki, setNotice, setOpen]);
  const onCopySundayProgram = useCallback(() => {
    navigator.clipboard.writeText(html);
    setNotice("日曜日のプログラム");
    setOpen(true);
  }, [html, setNotice, setOpen]);
  const form = useMemo(() => {
    if (day === null) {
      return null;
    }
    return (
      <SectionWrapper
        label={`${day.getMonth() + 1}/${day.getDate()}(日)の内容`}
      >
        {isFirstSunday && <Typography>第一日曜日です</Typography>}
        <FormWrapper label="Week">
          <TextField
            fullWidth
            type="number"
            placeholder="40"
            value={weekNo}
            onChange={(e) => setWeekNo(Number(e.target.value))}
          />
        </FormWrapper>

        <FormWrapper label="教会歴">
          <TextField
            fullWidth
            placeholder="聖霊降臨後第4主日"
            value={kyoukaireki}
            onChange={(e) => setKyoukaireki(e.target.value)}
          />
        </FormWrapper>
        <SectionWrapper label="朝礼拝の内容">
          <Button onClick={stream.handleOpen}>配信URL</Button>
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
              placeholder="試練を通して受け取る祝福"
            ></TextField>
          </FormWrapper>
          <PasterPicker
            id="primary-paster"
            value={paster}
            onChange={setPaster}
          />
          <FormWrapper label="聖書箇所">
            <BiblePartSelector book={bible1} onChange={setBible1} />
          </FormWrapper>
          <FormWrapper label="讃美歌1">
            <SongPicker id="song1" onChange={(val) => setSong1(val)} />
            <TextField
              value={song1}
              onChange={(e) => setSong1(e.target.value)}
              fullWidth
            />
          </FormWrapper>
          <FormWrapper label="讃美歌2">
            <SongPicker id="song2" onChange={(val) => setSong2(val)} />
            <TextField
              value={song2}
              onChange={(e) => setSong2(e.target.value)}
              fullWidth
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
              placeholder="試練を通して受け取る祝福"
            />
          </FormWrapper>
          <PasterPicker
            id="secondary-paster"
            value={paster2}
            onChange={setPaster2}
          />
          <FormWrapper label="聖書箇所">
            <BiblePartSelector book={bible2} onChange={setBible2} />
          </FormWrapper>
          <FormWrapper label="讃美歌1">
            <SongPicker id="song2" onChange={(val) => setSong21(val)} />
            <TextField
              value={song21}
              onChange={(e) => setSong21(e.target.value)}
              fullWidth
              placeholder="249（われつみびとの　かしらなれども）"
            />
          </FormWrapper>
          <FormWrapper label="讃美歌2">
            <SongPicker id="song2" onChange={(val) => setSong22(val)} />
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
              placeholder="試練を通して受け取る祝福"
            />
          </FormWrapper>
          <PasterPicker
            id="evening-paster"
            value={paster3}
            onChange={setPaster3}
          />
          <FormWrapper label="聖書箇所">
            <BiblePartSelector book={bible3} onChange={setBible3} />
          </FormWrapper>
          <FormWrapper label="讃美歌1">
            <SongPicker id="song2" onChange={(val) => setSong31(val)} />
            <TextField
              value={song31}
              onChange={(e) => setSong31(e.target.value)}
              fullWidth
              placeholder="249（われつみびとの　かしらなれども）"
            />
          </FormWrapper>
          <FormWrapper label="讃美歌2">
            <SongPicker id="song2" onChange={(val) => setSong32(val)} />
            <TextField
              value={song32}
              onChange={(e) => setSong32(e.target.value)}
              fullWidth
              placeholder="270（信仰こそ旅路を　みちびく杖）"
            />
          </FormWrapper>
        </SectionWrapper>
        {stream.body}
      </SectionWrapper>
    );
  }, [
    bible1,
    bible2,
    bible3,
    day,
    isFirstSunday,
    kyoukaireki,
    onChangeCheckbox,
    onChangeRadio,
    paster,
    paster2,
    paster3,
    psalms,
    setBible1,
    setBible2,
    setBible3,
    setKyoukaireki,
    setPaster,
    setPaster2,
    setPaster3,
    setPsalms,
    setSong1,
    setSong2,
    setSong21,
    setSong22,
    setSong31,
    setSong32,
    setTitle,
    setTitle2,
    setTitle3,
    setWeekNo,
    song1,
    song2,
    song21,
    song22,
    song31,
    song32,
    stream.body,
    stream.handleOpen,
    title,
    title2,
    title3,
    weekNo,
  ]);

  const onCopySunday = useCallback(() => {
    if (!day) {
      return;
    }
    const text = `${day.getFullYear()}年${
      day.getMonth() + 1
    }月${day.getDate()}日（日）`;
    navigator.clipboard.writeText(text);
    setNotice(text);
    setOpen(true);
  }, [day, setNotice, setOpen]);

  const copy = useMemo(() => {
    if (day === null) {
      return null;
    }
    return (
      <>
        <Card sx={{ marginTop: "16px", padding: "16px" }}>
          <p>Week{weekNo}</p>
          <Button variant="contained" onClick={onCopyWeekNo}>
            Weekをコピーする
          </Button>
        </Card>
        <Card sx={{ marginTop: "16px", padding: "16px" }}>
          <Typography>
            {day.getFullYear()}年{day.getMonth() + 1}月{day.getDate()}
            日（日）
          </Typography>
          <Button variant="contained" onClick={onCopySunday}>
            日付をコピーする
          </Button>
        </Card>
        <Card sx={{ marginTop: "16px", padding: "16px" }}>
          <p>{kyoukaireki}</p>
          <Button variant="contained" onClick={onCopyKyoukarireki}>
            教会歴をコピーする
          </Button>
        </Card>
        <Card sx={{ marginTop: "16px", padding: "16px" }}>
          <p
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <Button variant="contained" onClick={onCopySundayProgram}>
            日曜日のプログラムをコピーする
          </Button>
        </Card>
      </>
    );
  }, [
    day,
    html,
    kyoukaireki,
    onCopyKyoukarireki,
    onCopySunday,
    onCopySundayProgram,
    onCopyWeekNo,
    weekNo,
  ]);
  const setValues = useCallback(
    (values: Values) => {
      const {
        weekNo,
        kyoukaireki,
        csUrl,
        url,
        biblePage,
        title,
        paster,
        bible1,
        psalms,
        song1,
        song2,
        title2,
        paster2,
        bible2,
        song21,
        song22,
        title3,
        paster3,
        bible3,
        song31,
        song32,
      } = values;
      setWeekNo(weekNo);
      setKyoukaireki(kyoukaireki);
      setCsUrl(csUrl);
      setUrl(url);
      setBiblePage(biblePage);
      setTitle(title);
      setPaster(paster);
      setBible1(bible1);
      setPsalms(psalms);
      setSong1(song1);
      setSong2(song2);
      setTitle2(title2);
      setPaster2(paster2);
      setBible2(bible2);
      setSong21(song21);
      setSong22(song22);
      setTitle3(title3);
      setPaster3(paster3);
      setBible3(bible3);
      setSong31(song31);
      setSong32(song32);
    },
    [
      setWeekNo,
      setKyoukaireki,
      setCsUrl,
      setUrl,
      setBiblePage,
      setTitle,
      setPaster,
      setBible1,
      setPsalms,
      setSong1,
      setSong2,
      setTitle2,
      setPaster2,
      setBible2,
      setSong21,
      setSong22,
      setTitle3,
      setPaster3,
      setBible3,
      setSong31,
      setSong32,
    ]
  );

  return {
    form,
    copy,
    values: {
      weekNo,
      kyoukaireki,
      csUrl,
      url,
      biblePage,
      title,
      paster,
      bible1,
      psalms,
      song1,
      song2,
      title2,
      paster2,
      bible2,
      song21,
      song22,
      title3,
      paster3,
      bible3,
      song31,
      song32,
    },
    setValues,
  };
};
