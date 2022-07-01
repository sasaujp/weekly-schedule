import { useMemo } from "react";

export const usePrimaryHTML = (
  url: string,
  title: string,
  paster: string,
  bible: string,
  chapter: string,
  verseFrom: string,
  verseTo: string,
  psalms: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    const optional = verseFrom !== verseTo ? `-${verseTo}` : "";
    return `<strong>教会学校　　9時・大礼拝堂<a href="https://www.ginza-church.com/cs/top/">（インターネット配信・家庭礼拝）</a></strong><br>
<br>
<strong>主日礼拝　　10時30分・大礼拝堂<a href="${url}" target=" rel=" rel="noopener noreferrer">（インターネット配信・家庭礼拝）</a></strong><br>
交読詩編　${psalms}<br>
説教　「${title}」　${paster}<br>
聖書　${bible}　${chapter}章${verseFrom}${optional}節<br>
讃美歌　${song1}、${song2}`;
  }, [
    url,
    title,
    paster,
    bible,
    chapter,
    verseFrom,
    verseTo,
    psalms,
    song1,
    song2,
  ]);
};

export const useSecondaryHTML = (
  title: string,
  paster: string,
  bible: string,
  chapter: string,
  verseFrom: string,
  verseTo: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    const optional = verseFrom !== verseTo ? `-${verseTo}` : "";
    return `<strong>主日第二礼拝　15時・大礼拝堂</strong><br>
説教　「${title}」　${paster}<br>
聖書　${bible}　${chapter}章${verseFrom}${optional}節<br>
讃美歌　${song1}、${song2}`;
  }, [title, paster, bible, chapter, verseFrom, verseTo, song1, song2]);
};

export const useEveningHTML = (
  title: string,
  paster: string,
  bible: string,
  chapter: string,
  verseFrom: string,
  verseTo: string,
  psalms: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    const optional = verseFrom !== verseTo ? `-${verseTo}` : "";
    return `<strong>主日夕礼拝　18時・大礼拝堂</strong><br>
交読詩編　${psalms}<br>
説教　「${title}」　${paster}<br>
聖書　${bible}　${chapter}章${verseFrom}${optional}節<br>
讃美歌　${song1}、${song2}`;
  }, [psalms, title, paster, bible, chapter, verseFrom, verseTo, song1, song2]);
};

export const useCombine = (
  html1: string,
  html2: string,
  html3: string,
  isFirstSunday: boolean
) => {
  return useMemo(() => {
    return (
      html1 +
      "<br>\n<br>\n" +
      html2 +
      "<br>\n<br>\n" +
      html3 +
      (isFirstSunday
        ? "<br>\n<br>\n－主日礼拝・第二礼拝・夕礼拝において聖餐式を行う予定です－"
        : "")
    );
  }, [html1, html2, html3, isFirstSunday]);
};

export type BookType = {
  book: string;
  chapter: string;
  verseFrom: string;
  verseTo: string;
};
export const useWeekDayHTML = ({
  book,
  chapter,
  verseFrom,
  verseTo,
}: BookType) => {
  const optional = verseFrom !== verseTo ? `-${verseTo}` : "";

  return `<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${book}　${chapter}章${verseFrom}${optional}節`;
};

export const useWednesdayHTML = ({
  book,
  chapter,
  verseFrom,
  verseTo,
}: BookType) => {
  return useMemo(() => {
    const optional = verseFrom !== verseTo ? `-${verseTo}` : "";
    return `<strong>オルガン・メディテーション</strong>　　12時15分・大礼拝堂<br>
聖書　${book}　${chapter}章${verseFrom}${optional}節`;
  }, [book, chapter, verseFrom, verseTo]);
};

export const useTuesdayHTML = (
  bible: BookType,
  study1: BookType,
  isTutorial: boolean,
  book: string,
  pageNumber: number
) => {
  return useMemo(() => {
    const optional1 =
      study1.verseFrom !== study1.verseTo ? `-${study1.verseTo}` : "";
    const optional2 =
      bible.verseFrom !== bible.verseTo ? `-${bible.verseTo}` : "";

    return `<strong>聖書講義</strong>　　－休会－<!--<a href="https://www.ginza-church.com/service/info/#kitou">　10時30分・小礼拝堂</a>--><br>
「${study1.book}　${study1.chapter}章${study1.verseFrom}${optional1}節」<br>
<strong>祈祷会</strong>　　　－休会－<!--講義に引き続き11時30分まで--><br>
<br>
<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${bible.book}　${bible.chapter}章${bible.verseFrom}${optional2}節${
      isTutorial
        ? `<br>
<br>
<strong>入門講座</strong>　　<a href="https://www.ginza-church.com/service/info/#nyuumon">18時・小礼拝堂</a><br>
『${book}』${pageNumber}頁-`
        : ""
    }`;
  }, [bible, study1, isTutorial, book, pageNumber]);
};

export const useThursdayHTML = (bible: BookType, study: BookType) => {
  return useMemo(() => {
    const optional1 =
      bible.verseFrom !== bible.verseTo ? `-${bible.verseTo}` : "";
    const optional2 =
      study.verseFrom !== study.verseTo ? `-${study.verseTo}` : "";

    return `<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${bible.book}　${bible.chapter}章${bible.verseFrom}${optional1}節<br>
<br>
<strong>聖書講義</strong>　　－休会－<!--<a href="https://www.ginza-church.com/service/info/#kitou">　18時00分・小礼拝堂</a>--><br>
「${study.book}　${study.chapter}章${study.verseFrom}${optional2}節」<br>
<strong>祈祷会</strong>　　　－休会－<!--講義に引き続き19時00分まで-->`;
  }, [bible, study]);
};
