import { Box, Card, Typography } from "@mui/material";

export const SectionWrapper: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <Card sx={{ marginTop: "16px", padding: "16px" }}>
      <Typography variant="h6">{label}</Typography>
      {<Box sx={{ paddingLeft: "16px" }}>{children}</Box>}
    </Card>
  );
};

export const FormWrapper: React.FC<{
  label: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ label, description, children }) => {
  return (
    <Box marginTop="16px">
      <Typography>
        {label}{" "}
        <Typography color="red" component="span" fontSize="small">
          {description}
        </Typography>
      </Typography>
      {children}
    </Box>
  );
};
