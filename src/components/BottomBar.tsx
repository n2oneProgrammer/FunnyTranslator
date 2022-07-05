import {Button, Paper, TextField} from "@mui/material";
import React, {useState} from "react";
import settings from "../scripts/settings";

interface Props {
  onTranslateButtonClick: () => void;

}

function BottomBar({onTranslateButtonClick}: Props) {
  const [pathLength, setPathLength] = useState(settings.pathLength);
  const changePathLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number.parseInt(event.target.value as string);
    if (Number.isNaN(value)) {
      value = 0;
    }
    settings.pathLength = value;
    setPathLength(settings.pathLength);
  };
  return (
    <Paper style={{
      marginTop: 10,
      padding: 15,
      display: "flex",
    }}>
      <div style={{
        flex: 1
      }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Path Length"
          value={pathLength}
          type={"number"}
          onChange={changePathLength}
          style={{
            marginTop: 20
          }}
        />
      </div>
      <div style={{
        flex: 1,
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
      </div>
    </Paper>
  )
}

export default BottomBar;