import {
  Modal,
  Box,
  Button,
  TextField,
  Link,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import {
  BiblePageType,
  StreamingUrlType,
  youtubeApiKeyState,
} from "./InputValues";
import { atom, RecoilState, useRecoilState } from "recoil";
import { FormWrapper } from "./misc";
import { isBefore } from "date-fns";
import { BookType, makeChapterString } from "./hooks/useHTML";

const CS_SKIP = true

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const credentialState = atom<string>({
  key: "credential-state",
  default: "",
});

const Signin: React.FC<{
  progressing: boolean;
  actionLabel: string;
  action: (apiKey: string, credential: string) => Promise<void>;
}> = ({ progressing, action, actionLabel }) => {
  const [credential, setCredential] = useRecoilState(credentialState);
  const [apiKey] = useRecoilState(youtubeApiKeyState);

  const signIn = useCallback(async () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "347509936536-ip5sqj72ubsbsenmajahchsl6bjddc6e.apps.googleusercontent.com",
      callback: (resp) => {
        setCredential(resp.access_token);
      },
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    });
    client.requestAccessToken();
  }, [setCredential]);

  const onAction = useCallback(() => {
    action(apiKey, credential);
  }, [action, apiKey, credential]);

  return (
    <Box marginTop="16px" marginBottom="16px">
      <Button variant="contained" onClick={signIn}>
        銀座教会アカウントでログイン
      </Button>
      <Button
        sx={{
          marginLeft: "16px",
        }}
        disabled={apiKey.length === 0 || credential.length === 0 || progressing}
        variant="contained"
        onClick={onAction}
      >
        {progressing ? "処理中..." : actionLabel}
      </Button>
    </Box>
  );
};

export const useStream = (
  day: Date | null,
  bible: BookType,
  paster: string,
  title: string,
  csUrlState: RecoilState<StreamingUrlType>,
  urlState: RecoilState<StreamingUrlType>,
  biblePageState: RecoilState<BiblePageType>,
  setNoticeOpen: (val: boolean) => void,
  setNotice: (text: string) => void
) => {
  const [progressing, setProgressing] = useState(false);
  const [open, setOpen] = useState(false);
  const [csUrl, setCsUrl] = useRecoilState(csUrlState);
  const [url, setUrl] = useRecoilState(urlState);
  const [page, setPage] = useRecoilState(biblePageState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const create = useCallback(
    async (apiKey: string, credential: string) => {
      if (!day) {
        return;
      }
      setProgressing(true);
      const dateTitle = `${day.getFullYear()}/${
        day.getMonth() + 1
      }/${day.getDate()}`;
      const dateData = `${day.getFullYear()}-${String(
        day.getMonth() + 1
      ).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
      const bibleSection = `聖　書　${makeChapterString(bible)} ${page.type}${
        page.from
      }${page.from !== page.to ? `〜${page.to}` : ""}ページ`;
      const messageSection = `説　教　「${title}」　${paster}`;
      if (apiKey.length && credential.length) {
        if (!CS_SKIP) {
          const csResp = await axios.post(
                  `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&part=status&key=${apiKey}`,
                  JSON.stringify({
                    snippet: {
                      title: `銀座教会教会学校礼拝(${dateTitle} 9:00~)`,
                      description: `${bibleSection}\n\n※教会学校の礼拝配信は３月末までとさせていただきます。４月からは礼拝堂に集まっての礼拝となりますので、ご予定おきください。`,
                      scheduledStartTime: `${dateData}T09:00:00+09:00`,
                      isDefaultBroadcast: false,
                    },
                    status: {
                      privacyStatus: "unlisted",
                      selfDeclaredMadeForKids: true,
                    },
                  }),
                  {
                    headers: {
                      Authorization: `Bearer ${credential}`,
                      "Content-Type": "application/json",
                    },
                  }
                  );
          const csId = csResp.data["id"];
          setCsUrl({
            url: `https://youtube.com/live/${csId}?feature=share`,
            date: dateTitle,
          });
        }
        const mainResp = await axios.post(
          `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&part=status&key=${apiKey}`,
          JSON.stringify({
            snippet: {
              title: `銀座教会主日礼拝(${dateTitle} 10:30~)`,
              description: `${bibleSection}\n${messageSection}`,
              scheduledStartTime: `${dateData}T10:30:00+09:00`,
              isDefaultBroadcast: false,
            },
            status: {
              privacyStatus: "unlisted",
              selfDeclaredMadeForKids: false,
            },
          }),
          {
            headers: {
              Authorization: `Bearer ${credential}`,
              "Content-Type": "application/json",
            },
          }
        );
        const mainId = mainResp.data["id"];
        setUrl({
          url: `https://youtube.com/live/${mainId}?feature=share`,
          date: dateTitle,
        });
        setProgressing(false);
      }
    },
    [bible, day, page.from, page.to, page.type, paster, setCsUrl, setUrl, title]
  );

  const onCopy = useCallback(() => {
    if (!day) {
      return;
    }
    const [dateTitle] = makeDateString(new Date(csUrl.date));
    const text = `配信日: ${dateTitle}\nCS: ${csUrl.url}\n主日: ${url.url}\nご確認のほどよろしくお願いいたします。`;
    navigator.clipboard.writeText(text);
    setNotice("Slack用文言");
    setNoticeOpen(true);
  }, [day, csUrl.date, csUrl.url, url.url, setNotice, setNoticeOpen]);

  const body = useMemo(() => {
    if (day === null) {
      return null;
    }
    const isOld = isBefore(new Date(csUrl.date), day);
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Signin
            action={create}
            actionLabel="配信枠の作成"
            progressing={progressing}
          />
          <Stack
            direction="row"
            alignItems="center"
            marginTop="16px"
            spacing="16px"
            sx={{ marginBottom: "16px" }}
          >
            <FormControl>
              <InputLabel id="bible-select-label">聖書</InputLabel>
              <Select
                labelId="bible-select-label"
                value={page.type}
                label="聖書"
                onChange={(e) => setPage({ ...page, type: e.target.value })}
              >
                <MenuItem value="旧約聖書">旧約聖書</MenuItem>
                <MenuItem value="新約聖書">新約聖書</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={page.from}
              onChange={(e) =>
                setPage({
                  ...page,
                  from: Number(e.target.value),
                  to: Math.max(Number(e.target.value), page.to),
                })
              }
              sx={{ width: 80 }}
              type="number"
              label="ページ"
            />
            <Typography>から</Typography>
            <TextField
              value={page.to}
              onChange={(e) =>
                setPage({
                  ...page,
                  to: Number(e.target.value),
                  from: Math.min(Number(e.target.value), page.from),
                })
              }
              sx={{ width: 80 }}
              type="number"
              label="ページ"
            />
          </Stack>
          <Typography color={isOld ? "red" : undefined}>
            配信日: {csUrl.date}
            {isOld ? "(古くなっています)" : ""}
          </Typography>
          {!CS_SKIP ? (
            <Box>
              CS:{" "}
              <Link target="_blank" rel="noreferrer" href={csUrl.url}>
                {csUrl.url}
              </Link>{" "}
            </Box>
          ) : null}
          <Box>
            主日:{" "}
            <Link target="_blank" rel="noreferrer" href={url.url}>
              {url.url}
            </Link>{" "}
          </Box>
          <Button
            onClick={onCopy}
            sx={{
              marginTop: "16px",
            }}
            variant="contained"
          >
            Slack用文言をコピー
          </Button>
        </Box>
      </Modal>
    );
  }, [
    create,
    csUrl.date,
    csUrl.url,
    day,
    handleClose,
    onCopy,
    open,
    page,
    progressing,
    setPage,
    url.url,
  ]);

  return {
    handleOpen,
    body,
  };
};

export const useApiKey = () => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useRecoilState(youtubeApiKeyState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const body = useMemo(() => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormWrapper label="API Key">
            <TextField
              fullWidth
              value={apiKey}
              onChange={(e) => setApiKey(e.currentTarget.value)}
            />
          </FormWrapper>
        </Box>
      </Modal>
    );
  }, [apiKey, handleClose, open, setApiKey]);

  return {
    handleOpen,
    body,
  };
};

const makeDateString = (day: Date) => {
  const dateTitle = `${day.getFullYear()}/${
    day.getMonth() + 1
  }/${day.getDate()}`;
  const dateData = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(day.getDate()).padStart(2, "0")}`;
  return [dateTitle, dateData];
};

const makeBookString = (bible: BookType) => {
  return `聖書  ${makeChapterString(bible)}`;
};

const makeStreamStatus = (urlType: StreamingUrlType, day: Date | null) => {
  if (day === null) {
    return "(祝日なのでスキップします)";
  }
  if (isBefore(new Date(urlType.date), day)) {
    return "(古くなっています)";
  }
  return null;
};

export const useWeekdayStream = (
  day1: Date | null,
  day2: Date | null,
  book1: BookType,
  book2: BookType,
  tuesdayUrlState: RecoilState<StreamingUrlType>,
  thursdayUrlState: RecoilState<StreamingUrlType>,
  setNoticeOpen: (val: boolean) => void,
  setNotice: (text: string) => void
) => {
  const [progressing, setProgressing] = useState(false);
  const [open, setOpen] = useState(false);
  const [tuesdayUrl, setTuesdayUrl] = useRecoilState(tuesdayUrlState);
  const [thursdayUrl, setThursdayUrl] = useRecoilState(thursdayUrlState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const create = useCallback(
    async (apiKey: string, credential: string) => {
      setProgressing(true);
      if (apiKey.length && credential.length) {
        const values = [
          {
            day: day1,
            time: "10:30",
            description: `${makeBookString(
              book1
            )}\n　　　　　　　　　　　　髙橋　潤　牧師`,
            setter: setTuesdayUrl,
          },
          {
            day: day2,
            time: "18:00",
            description: `${makeBookString(
              book2
            )}\n　　　　　　　　　　　　山森　風花　伝道師`,
            setter: setThursdayUrl,
          },
        ];
        for (const { day, description, time, setter } of values) {
          if (!day) {
            continue;
          }
          const [dateTitle, dateData] = makeDateString(day);
          const resp = await axios.post(
            `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&part=status&key=${apiKey}`,
            JSON.stringify({
              snippet: {
                title: `銀座教会聖書講義祈祷会(${dateTitle} ${time}~)`,
                description: description,
                scheduledStartTime: `${dateData}T${time}:00+09:00`,
                isDefaultBroadcast: false,
              },
              status: {
                privacyStatus: "unlisted",
                selfDeclaredMadeForKids: false,
              },
            }),
            {
              headers: {
                Authorization: `Bearer ${credential}`,
                "Content-Type": "application/json",
              },
            }
          );
          const id = resp.data["id"];
          setter({
            url: `https://youtube.com/live/${id}?feature=share`,
            date: dateTitle,
          });
        }
        setProgressing(false);
      }
    },
    [book1, book2, day1, day2, setThursdayUrl, setTuesdayUrl]
  );

  const copyTitle1 = useCallback(() => {
    const [_y, m, d] = tuesdayUrl.date.split("/");
    if (!m || !d) {
      return;
    }
    const text = `${m}月${d}日  火曜日聖書講義・祈祷会`;
    navigator.clipboard.writeText(text);
    setNotice("メール用件名");
    setNoticeOpen(true);
  }, [setNotice, setNoticeOpen, tuesdayUrl.date]);

  const copyBody1 = useCallback(() => {
    const text = `${makeBookString(book1)}\n\n${
      tuesdayUrl.url
    }\n\n担当  髙橋 潤`;
    navigator.clipboard.writeText(text);
    setNotice("メール用本文");
    setNoticeOpen(true);
  }, [book1, setNotice, setNoticeOpen, tuesdayUrl.url]);

  const copyTitle2 = useCallback(() => {
    const [_y, m, d] = thursdayUrl.date.split("/");
    if (!m || !d) {
      return;
    }
    const text = `${m}月${d}日  木曜日聖書講義・祈祷会`;
    navigator.clipboard.writeText(text);
    setNotice("メール用件名");
    setNoticeOpen(true);
  }, [setNotice, setNoticeOpen, thursdayUrl.date]);

  const copyBody2 = useCallback(() => {
    const text = `${makeBookString(book2)}\n\n${
      thursdayUrl.url
    }\n\n担当  山森 風花`;
    navigator.clipboard.writeText(text);
    setNotice("メール用本文");
    setNoticeOpen(true);
  }, [book2, setNotice, setNoticeOpen, thursdayUrl.url]);

  const body = useMemo(() => {
    const status1 = makeStreamStatus(tuesdayUrl, day1);
    const status2 = makeStreamStatus(thursdayUrl, day2);
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Signin
            progressing={progressing}
            action={create}
            actionLabel="配信枠の作成"
          />
          <Typography color={status1 ? "red" : undefined}>
            配信日: {tuesdayUrl.date}
            {status1}
          </Typography>
          <Box>
            火曜日:{" "}
            <Link target="_blank" rel="noreferrer" href={tuesdayUrl.url}>
              {tuesdayUrl.url}
            </Link>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            marginTop="16px"
            marginBottom="16px"
            spacing="16px"
          >
            <Button variant="contained" onClick={copyTitle1}>
              件名をコピー
            </Button>
            <Button variant="contained" onClick={copyBody1}>
              本文をコピー
            </Button>
          </Stack>

          <Typography color={status2 ? "red" : undefined}>
            配信日: {thursdayUrl.date}
            {status2}
          </Typography>
          <Box>
            木曜日:{" "}
            <Link target="_blank" rel="noreferrer" href={thursdayUrl.url}>
              {thursdayUrl.url}
            </Link>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            marginTop="16px"
            marginBottom="16px"
            spacing="16px"
          >
            <Button variant="contained" onClick={copyTitle2}>
              件名をコピー
            </Button>
            <Button variant="contained" onClick={copyBody2}>
              本文をコピー
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  }, [
    copyBody1,
    copyBody2,
    copyTitle1,
    copyTitle2,
    create,
    day1,
    day2,
    handleClose,
    open,
    progressing,
    thursdayUrl,
    tuesdayUrl,
  ]);

  return {
    handleOpen,
    body,
  };
};

type BloadcastData = {
  nextPageToken?: string;
  items: BloadcastItem[];
};

type BloadcastItem = {
  id: string;
  snippet: {
    title: string;
    description: string;
  };
};

export const useStreamHistory = () => {
  const [data, setData] = useState<BloadcastItem[]>([]);
  const [progressing, setProgressing] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const create = useCallback(async (apiKey: string, credential: string) => {
    setProgressing(true);
    let pageToken = "";
    let items: BloadcastItem[] = [];
    while (true) {
      const resp = await axios.get<BloadcastData>(
        `https://www.googleapis.com/youtube/v3/liveBroadcasts?key=${apiKey}&part=snippet&broadcastStatus=completed&broadcastType=all&maxResults=50${
          pageToken.length ? `&pageToken=${pageToken}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${credential}`,
            "Content-Type": "application/json",
          },
        }
      );
      items = [
        ...items,
        ...resp.data.items.filter((item) => {
          return item.snippet.title.includes("聖書講義");
        }),
      ];
      if (!resp.data.nextPageToken) {
        break;
      }
      pageToken = resp.data.nextPageToken;
    }
    setProgressing(false);
    setData(items);
  }, []);

  const [filteredText, setFilteredText] = useState("全て表示");

  const filterdItems = useMemo(() => {
    if (filteredText === "全て表示") {
      return data;
    }
    return data.filter((i) => {
      return i.snippet.description.includes(filteredText);
    });
  }, [data, filteredText]);

  const text = useMemo(() => {
    let t = "";
    for (const item of filterdItems) {
      t += `${item.snippet.title}\n`;
      t += `https://youtube.com/live/${item.id}?feature=share\n`;
      t += `${item.snippet.description}\n`;
      t += "\n";
    }
    return t;
  }, [filterdItems]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  const body = useMemo(() => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Signin
            progressing={progressing}
            action={create}
            actionLabel="過去の配信情報を取得"
          />
          <Box>
            <Stack direction="row" alignItems="center" spacing="16px">
              <FormControl
                sx={{
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
              >
                <InputLabel id="filter-label">絞り込み</InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter-select"
                  label="絞り込み"
                  value={filteredText}
                  onChange={(e) => {
                    setFilteredText(e.target.value);
                  }}
                >
                  {["全て表示", "潤", "山森"].map((v, idx) => (
                    <MenuItem key={idx} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={copy}>
                コピーする
              </Button>
            </Stack>
            <TextField
              sx={{
                maxHeight: "400px",
                overflowY: "auto",
              }}
              multiline={true}
              value={text}
              fullWidth
            />
          </Box>
        </Box>
      </Modal>
    );
  }, [open, handleClose, progressing, create, filteredText, text, copy]);

  return {
    handleOpen,
    body,
  };
};
