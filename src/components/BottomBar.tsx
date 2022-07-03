import {Button, Paper} from "@mui/material";
import React from "react";

interface Props {
  onTranslateButtonClick: () => void
}

function BottomBar({onTranslateButtonClick}: Props) {
  return (
    <Paper style={{
      marginTop: 10,
      padding: 15,
      display: "flex",
      alignItems: "flex-end"
    }}>
      <Button variant="contained"
              style={{
                marginRight: 20,
                marginLeft: "auto",
                fontSize: "1rem"
              }}
              onClick={onTranslateButtonClick}
      >Translate</Button>
    </Paper>
  )
}

export default BottomBar;