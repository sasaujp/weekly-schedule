import { useMemo } from "react";

export const usePrimaryHTML = (
  url: string,
  title: string,
  paster: string,
  bible: string,
  psalms: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    return `<strong>教会学校　　9時・大礼拝堂<a href="https://www.ginza-church.com/cs/top/">（インターネット配信・家庭礼拝）</a></strong><br>
<br>
<strong>主日礼拝　　10時30分・大礼拝堂<a href="${url}" target=" rel=" rel="noopener noreferrer">（インターネット配信・家庭礼拝）</a></strong><br>
交読詩編　${psalms}<br>
説教　「${title}」　${paster}<br>
聖書　${bible}<br>
讃美歌　${song1}、${song2}`;
  }, [url, title, paster, bible, psalms, song1, song2]);
};

export const useSecondaryHTML = (
  title: string,
  paster: string,
  bible: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    return `<strong>主日第二礼拝　15時・大礼拝堂</strong><br>
説教　「${title}」　${paster}<br>
聖書　${bible}<br>
讃美歌　${song1}、${song2}`;
  }, [title, paster, bible, song1, song2]);
};

export const useEveningHTML = (
  title: string,
  paster: string,
  bible: string,
  psalms: string,
  song1: string,
  song2: string
) => {
  return useMemo(() => {
    return `<strong>主日夕礼拝　18時・大礼拝堂</strong><br>
交読詩編　${psalms}<br>
説教　「${title}」　${paster}<br>
聖書　${bible}<br>
讃美歌　${song1}、${song2}`;
  }, [title, paster, bible, psalms, song1, song2]);
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

export const useWeekDayHTML = (bible: string) => {
  return `<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${bible}`;
};

export const useWednesdayHTML = (bible: string) => {
  return useMemo(() => {
    return `<strong>オルガン・メディテーション</strong>　　12時15分・大礼拝堂<br>
聖書　${bible}`;
  }, [bible]);
};

export const useTuesdayHTML = (
  bible: string,
  study1: string,
  isTutorial: boolean,
  book: string,
  pageNumber: number
) => {
  return useMemo(() => {
    return `<strong>聖書講義</strong>　　－休会－<!--<a href="https://www.ginza-church.com/service/info/#kitou">　10時30分・小礼拝堂</a>--><br>
「${study1}」<br>
<strong>祈祷会</strong>　　　－休会－<!--講義に引き続き11時30分まで--><br>
<br>
<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${bible}${
      isTutorial
        ? `<br>
<br>
<strong>入門講座</strong>　　<a href="https://www.ginza-church.com/service/info/#nyuumon">18時・小礼拝堂</a><br>
『${book}』${pageNumber}頁-`
        : ""
    }`;
  }, [bible, study1, isTutorial, book, pageNumber]);
};

export const useThursdayHTML = (bible: string, study: string) => {
  return useMemo(() => {
    return `<strong>正午礼拝</strong>　　12時15分・大礼拝堂<br>
聖書　${bible}<br>
<br>
<strong>聖書講義</strong>　　－休会－<!--<a href="https://www.ginza-church.com/service/info/#kitou">　18時00分・小礼拝堂</a>--><br>
「${study}」<br>
<strong>祈祷会</strong>　　　－休会－<!--講義に引き続き19時00分まで-->`;
  }, [bible, study]);
};
