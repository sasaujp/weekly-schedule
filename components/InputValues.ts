import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { BookType } from "./hooks/useHTML";

const { persistAtom } = recoilPersist();

export const youtubeApiKeyState = atom<string>({
  key: "youtube-apikey",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const dateState = atom<Date | null>({
  key: "date",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const tutorialBookState = atom<string>({
  key: "tutorialBook",
  default: "改めて学ぶ、教団信仰告白",
  effects_UNSTABLE: [persistAtom],
});

export const tutorialBookPageState = atom<string>({
  key: "tutorialBookPage",
  default: "0",
  effects_UNSTABLE: [persistAtom],
});

export const study1State = atom<BookType>({
  key: "study1State",
  default: {
    book: "",
    chapter: "",
    verseFrom: "",
    verseTo: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const study2State = atom<BookType>({
  key: "study2State",
  default: {
    book: "",
    chapter: "",
    verseFrom: "",
    verseTo: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const weekdayState = atom<{ [key: number]: BookType }>({
  key: "weekdayState",
  default: {
    1: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
    2: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
    3: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
    4: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
    5: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
    6: {
      book: "",
      chapter: "",
      verseFrom: "",
      verseTo: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export type SundayType = {
  weekNoState: RecoilState<number>;
  kyoukairekiState: RecoilState<string>;
  psalmsState: RecoilState<string>;
  csUrlState: RecoilState<StreamingUrlType>;
  urlState: RecoilState<StreamingUrlType>;
  biblePageState: RecoilState<BiblePageType>;
  titleState: RecoilState<string>;
  song1State: RecoilState<string>;
  song2State: RecoilState<string>;
  pasterState: RecoilState<string>;
  bibleState: RecoilState<string>;
  chapterState: RecoilState<string>;
  verseFromState: RecoilState<string>;
  verseToState: RecoilState<string>;
  title2State: RecoilState<string>;
  song21State: RecoilState<string>;
  song22State: RecoilState<string>;
  paster2State: RecoilState<string>;
  bible2State: RecoilState<string>;
  verseFrom2State: RecoilState<string>;
  verseTo2State: RecoilState<string>;
  chapter2State: RecoilState<string>;
  title3State: RecoilState<string>;
  song31State: RecoilState<string>;
  song32State: RecoilState<string>;
  paster3State: RecoilState<string>;
  bible3State: RecoilState<string>;
  verseFrom3State: RecoilState<string>;
  verseTo3State: RecoilState<string>;
  chapter3State: RecoilState<string>;
};

export type StreamingUrlType = {
  url: string;
  date: string;
};

export type BiblePageType = {
  type: string;
  from: number;
  to: number;
};

const makeSundayProguramState = (prefix: string): SundayType => {
  const weekNoState = atom<number>({
    key: prefix + "weekNo",
    default: 0,
    effects_UNSTABLE: [persistAtom],
  });
  const kyoukairekiState = atom<string>({
    key: prefix + "kyoukaireki",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });
  const csUrlState = atom<StreamingUrlType>({
    key: prefix + "csUrlState",
    default: { url: "", date: "" },
    effects_UNSTABLE: [persistAtom],
  });

  const urlState = atom<StreamingUrlType>({
    key: prefix + "mainUrlState",
    default: { url: "", date: "" },
    effects_UNSTABLE: [persistAtom],
  });

  const biblePageState = atom<BiblePageType>({
    key: prefix + "biblePageState",
    default: { type: "旧約聖書", from: 0, to: 0 },
    effects_UNSTABLE: [persistAtom],
  });
  const psalmsState = atom<string>({
    key: prefix + "psalms",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const titleState = atom<string>({
    key: prefix + "titleState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song1State = atom<string>({
    key: prefix + "song1State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song2State = atom<string>({
    key: prefix + "song2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const pasterState = atom<string>({
    key: prefix + "pasterState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const bibleState = atom<string>({
    key: prefix + "bibleState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const chapterState = atom<string>({
    key: prefix + "chapterState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const verseFromState = atom<string>({
    key: prefix + "verseFromState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const verseToState = atom<string>({
    key: prefix + "verseToState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  // 第二礼拝

  const title2State = atom<string>({
    key: prefix + "title2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song21State = atom<string>({
    key: prefix + "song21State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song22State = atom<string>({
    key: prefix + "song22State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const paster2State = atom<string>({
    key: prefix + "paster2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const bible2State = atom<string>({
    key: prefix + "bible2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const chapter2State = atom<string>({
    key: prefix + "chapter2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const verseFrom2State = atom<string>({
    key: prefix + "verseFrom2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });
  const verseTo2State = atom<string>({
    key: prefix + "verseTo2State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  // 夕礼拝

  const title3State = atom<string>({
    key: prefix + "title3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song31State = atom<string>({
    key: prefix + "song31State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const song32State = atom<string>({
    key: prefix + "song32State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const paster3State = atom<string>({
    key: prefix + "paster3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const bible3State = atom<string>({
    key: prefix + "bible3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const chapter3State = atom<string>({
    key: prefix + "chapter3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  const verseFrom3State = atom<string>({
    key: prefix + "verseFrom3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });
  const verseTo3State = atom<string>({
    key: prefix + "verseTo3State",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  return {
    weekNoState,
    kyoukairekiState,
    psalmsState,
    csUrlState,
    biblePageState,
    urlState,
    titleState,
    song1State,
    song2State,
    pasterState,
    bibleState,
    chapterState,
    verseFromState,
    verseToState,
    title2State,
    song21State,
    song22State,
    paster2State,
    bible2State,
    verseFrom2State,
    verseTo2State,
    chapter2State,
    title3State,
    song31State,
    song32State,
    paster3State,
    bible3State,
    verseFrom3State,
    verseTo3State,
    chapter3State,
  };
};

export const sunday1 = makeSundayProguramState("");
export const sunday2 = makeSundayProguramState("after");
