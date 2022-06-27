import React, { ReactNode } from "react";
import CommonContainer from "./common";

export const BasicLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <CommonContainer>{children}</CommonContainer>
    </>
  );
};
