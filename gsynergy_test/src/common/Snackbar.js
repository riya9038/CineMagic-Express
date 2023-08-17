import * as React from "react";

import Snackbar from "@mui/material/Snackbar";

export default function CustomizedSnackbars({ open, setOpen, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
}
