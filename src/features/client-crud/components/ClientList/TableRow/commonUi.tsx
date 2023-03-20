import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { RowDataContext } from "../context/RowDataProviderContext";
import { useContext } from "react";

export function InfoIdButton({ invoiceId }: { invoiceId: string | number }) {
  return (
    <Chip clickable={true} label={invoiceId} variant="filled" color="primary" />
  );
};

export function ShowDate({ admissionDate }: { admissionDate: string }) {
  let date = moment(admissionDate).format("DD/MM/YYYY");
  return <Typography variant="subtitle1" >{date}</Typography>;
};







