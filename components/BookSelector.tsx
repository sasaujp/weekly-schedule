import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";

const OLD = [
  "創世記",
  "出エジプト記",
  "レビ記",
  "民数記",
  "申命記",
  "ヨシュア記",
  "士師記",
  "ルツ記",
  "サムエル記上",
  "サムエル記下",
  "列王記上",
  "列王記下",
  "歴代誌上",
  "歴代誌下",
  "エズラ記",
  "ネヘミヤ記",
  "エステル記",
  "ヨブ記",
  "詩編",
  "箴言",
  "コヘレトの言葉",
  "雅歌",
  "イザヤ書",
  "エレミヤ書",
  "哀歌",
  "エゼキエル書",
  "ダニエル書",
  "ホセア書",
  "ヨエル書",
  "アモス書",
  "オバデヤ書",
  "ヨナ書",
  "ミカ書",
  "ナホム書",
  "ハバクク書",
  "ゼファニヤ書",
  "ハガイ書",
  "ゼカリヤ書",
  "マラキ書",
];

const NEW = [
  "マタイによる福音書",
  "マルコによる福音書",
  "ルカによる福音書",
  "ヨハネによる福音書",
  "使徒言行録",
  "ローマの信徒への手紙",
  "コリントの信徒への手紙一",
  "コリントの信徒への手紙二",
  "ガラテヤの信徒への手紙",
  "エフェソの信徒への手紙",
  "フィリピの信徒への手紙",
  "コロサイの信徒への手紙",
  "テサロニケの信徒への手紙一",
  "テサロニケの信徒への手紙二",
  "テモテへの手紙一",
  "テモテへの手紙二",
  "テトスへの手紙",
  "フィレモンへの手紙",
  "ヘブライ人への手紙",
  "ヤコブの手紙",
  "ペトロの手紙一",
  "ペトロの手紙二",
  "ヨハネの手紙一",
  "ヨハネの手紙二",
  "ヨハネの手紙三",
  "ユダの手紙",
  "ヨハネの黙示録",
];
const BOOKS = ["", ...OLD, ...NEW];

export const BookSelector: React.FC<{
  book: string;
  onChange: (value: string) => void;
}> = ({ book, onChange }) => {
  const _onChange = useCallback(
    (_: unknown, val: string | null) => {
      onChange(val ?? "");
    },
    [onChange]
  );
  return (
    <>
      <Autocomplete
        value={book}
        onChange={_onChange}
        disablePortal
        id="combo-box-demo"
        options={BOOKS}
        sx={{ marginTop: "16px", marginBottom: "16px", width: 300 }}
        renderInput={(params) => <TextField {...params} label="聖書" />}
      />
    </>
  );
};

export const BookNumberInput: React.FC<{
  chapter: string;
  onChangeChapter: (val: string) => void;
  verseFrom: string;
  onChangeVerseFrom: (val: string) => void;
  verseTo: string;
  onChangeVerseTo: (val: string) => void;
}> = ({
  chapter,
  onChangeChapter,
  verseFrom,
  onChangeVerseFrom,
  verseTo,
  onChangeVerseTo,
}) => {
  const _onChangeChapter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeChapter(e.target.value);
    },
    [onChangeChapter]
  );
  const _onChangeVerseFrom = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeVerseFrom(e.target.value);
    },
    [onChangeVerseFrom]
  );
  const _onChangeVerseTo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeVerseTo(e.target.value);
    },
    [onChangeVerseTo]
  );

  useEffect(() => {
    if (!verseFrom && !verseTo) {
      return;
    }
    const from = parseInt(verseFrom);
    const to = parseInt(verseTo);
    if (isNaN(to) || to < from) {
      onChangeVerseTo(verseFrom);
    }
  }, [onChangeVerseTo, verseFrom, verseTo]);
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="16px"
      sx={{ marginBottom: "16px" }}
    >
      <TextField
        value={chapter}
        onChange={_onChangeChapter}
        sx={{ width: 65 }}
        type="number"
        label="章"
      />
      <Typography>章</Typography>
      <TextField
        value={verseFrom}
        onChange={_onChangeVerseFrom}
        sx={{ width: 65 }}
        type="number"
        label="節"
      />
      <Typography>から</Typography>
      <TextField
        value={verseTo}
        onChange={_onChangeVerseTo}
        sx={{ width: 65 }}
        type="number"
        label="節"
      />
      <Typography>節</Typography>
    </Stack>
  );
};
