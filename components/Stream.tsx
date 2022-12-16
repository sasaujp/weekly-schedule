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

export const useStream = (
  day: Date | null,
  bible: string,
  chaper: string,
  verseFrom: string,
  verseTo: string,
  paster: string,
  title: string,
  csUrlState: RecoilState<StreamingUrlType>,
  urlState: RecoilState<StreamingUrlType>,
  biblePageState: RecoilState<BiblePageType>
) => {
  const [progressing, setProgressing] = useState(false);
  const [credential, setCredential] = useRecoilState(credentialState);
  const [open, setOpen] = useState(false);
  const [apiKey] = useRecoilState(youtubeApiKeyState);
  const [csUrl, setCsUrl] = useRecoilState(csUrlState);
  const [url, setUrl] = useRecoilState(urlState);
  const [page, setPage] = useRecoilState(biblePageState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const signIn = useCallback(async () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "347509936536-ip5sqj72ubsbsenmajahchsl6bjddc6e.apps.googleusercontent.com",
      callback: (resp) => {
        console.log("response", resp);
        setCredential(resp.access_token);
      },
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    });
    client.requestAccessToken();
  }, [setCredential]);

  const create = useCallback(async () => {
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
    console.log(dateData);
    const bibleSection = `聖　書　${bible} ${chaper}章${verseFrom}～${verseTo}節 ${
      page.type
    }${page.from}${page.from !== page.to ? `〜${page.to}` : ""}ページ`;
    const messageSection = `説　教　「${title}」　${paster}`;
    if (apiKey.length && credential.length) {
      const csResp = await axios.post(
        `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&part=status&key=${apiKey}`,
        JSON.stringify({
          snippet: {
            title: `銀座教会教会学校礼拝(${dateTitle} 9:00~)`,
            description: `${bibleSection}`,
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
  }, [
    apiKey,
    bible,
    chaper,
    credential,
    day,
    page.from,
    page.to,
    page.type,
    paster,
    setCsUrl,
    setUrl,
    title,
    verseFrom,
    verseTo,
  ]);

  const body = useMemo(() => {
    if (day === null) {
      return null;
    }
    console.log(day, new Date(csUrl.date));
    const isOld = isBefore(new Date(csUrl.date), day);
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box marginTop="16px" marginBottom="16px">
            <Button variant="contained" onClick={signIn}>
              銀座教会アカウントでログイン
            </Button>
            <Button
              sx={{
                marginLeft: "16px",
              }}
              disabled={
                apiKey.length === 0 || credential.length === 0 || progressing
              }
              variant="contained"
              onClick={create}
            >
              {progressing ? "作成中..." : "配信枠の作成"}
            </Button>
          </Box>
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
              sx={{ width: 65 }}
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
              sx={{ width: 65 }}
              type="number"
              label="ページ"
            />
          </Stack>
          <Typography color={isOld ? "red" : undefined}>
            配信日: {csUrl.date}
            {isOld ? "(古くなっています)" : ""}
          </Typography>
          <Box>
            CS:{" "}
            <Link target="_blank" rel="noreferrer" href={csUrl.url}>
              {csUrl.url}
            </Link>{" "}
          </Box>
          <Box>
            主日:{" "}
            <Link target="_blank" rel="noreferrer" href={url.url}>
              {url.url}
            </Link>{" "}
          </Box>
        </Box>
      </Modal>
    );
  }, [
    apiKey.length,
    create,
    credential.length,
    csUrl.date,
    csUrl.url,
    day,
    handleClose,
    open,
    page,
    progressing,
    setPage,
    signIn,
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
  const [_, setCredential] = useRecoilState(credentialState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const signIn = useCallback(async () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "347509936536-ip5sqj72ubsbsenmajahchsl6bjddc6e.apps.googleusercontent.com",
      callback: (resp) => {
        console.log("response", resp);
        setCredential(resp.access_token);
      },
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    });
    client.requestAccessToken();
  }, [setCredential]);

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
