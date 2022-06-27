import { Box } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>週間予定作成</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        sx={{
          height: "60px",
          backgroundColor: "#c6c1b7",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      />
      {children}
    </>
  );
};
