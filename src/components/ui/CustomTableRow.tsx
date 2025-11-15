import { styled, TableRow, tableRowClasses } from "@mui/material";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  cursor: "pointer",
  [`&.${tableRowClasses.head}`]: {
    cursor: "default"
  },
}));

export default CustomTableRow;
