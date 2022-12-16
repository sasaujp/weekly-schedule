import { Modal, Box, TextField, Button } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { youtubeClientIdState, youtubeClientSecretState } from "./InputValues";
import { FormWrapper } from "./misc";
import GoogleOneTapLogin from "react-google-one-tap-login";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const useStream = () => {
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useRecoilState(youtubeClientIdState);
  const [clientSecret, setClientSecret] = useRecoilState(
    youtubeClientSecretState
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const signIn = useCallback(async () => {
    // const auth = new GoogleAuth({
    //   scopes:
    //     "https://www.googleapis.com/auth/youtube,https://www.googleapis.com/auth/youtube.force-ssl",
    // });
    // const client = await auth.getClient();
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
          <FormWrapper label="クライアントID">
            <TextField
              fullWidth
              value={clientId}
              onChange={(e) => setClientId(e.currentTarget.value)}
            />
          </FormWrapper>
          <FormWrapper label="クライアントSecret">
            <TextField
              fullWidth
              value={clientSecret}
              onChange={(e) => setClientSecret(e.currentTarget.value)}
            />
          </FormWrapper>
        </Box>
      </Modal>
    );
  }, [clientId, clientSecret, handleClose, open, setClientId, setClientSecret]);

  return {
    handleOpen,
    body,
  };
};
