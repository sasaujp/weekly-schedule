import React from "react";
import { Box } from "@mui/material";

const Container: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box paddingTop="16px" margin="0 auto" paddingX="16px" maxWidth="1025px">
      {children}
    </Box>
  );
};

export default Container;
