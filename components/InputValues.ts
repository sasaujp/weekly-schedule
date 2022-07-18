import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { BookType } from "./hooks/useHTML";

const { persistAtom } = recoilPersist();

export const psalmsState = atom<string>({
  key: "psalms",
  default: "",
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

export const urlState = atom<string>({
  key: "urlState",
  default: "",
});

export const titleState = atom<string>({
  key: "titleState",
  default: "",
});

export const song1State = atom<string>({
  key: "song1State",
  default: "",
});

export const song2State = atom<string>({
  key: "song1State",
  default: "",
});

export const pasterState = atom<string>({
  key: "pasterState",
  default: "",
});

export const bibleState = atom<string>({
  key: "bibleState",
  default: "",
});

export const chapterState = atom<string>({
  key: "chapterState",
  default: "",
});

export const verseFromState = atom<string>({
  key: "verseFromState",
  default: "",
});

export const verseToState = atom<string>({
  key: "verseToState",
  default: "",
});
