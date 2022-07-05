import {Grid, Paper, TextField} from "@mui/material";
import React from "react";
import LanguageSelect from "./LanguageSelect";
import Languages from "../scripts/languages";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

interface Props {
  text: string,
  language: Languages,
  setLanguages: (newValue: Languages) => void,
  value: string,
  setValue: (newValue: string) => void
  isReadOnly?: boolean,
  progress?: number | undefined
}

function TextAreaPanel({text, language, setLanguages, value, setValue, isReadOnly = false, progress}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Paper style={{
      padding: 10
    }}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{
          margin: "auto",
          fontSize: "2rem"
        }}> {text}</Grid>
        <Grid item xs={6}><LanguageSelect language={language} setLanguage={setLanguages}/></Grid>
      </Grid>
      <div style={{
        position: "relative",
        marginTop: 20
      }}>
        <TextField
          id="outlined-multiline-flexible"
          label={text}
          multiline
          minRows={6}
          value={value}
          InputProps={{
            readOnly: isReadOnly,
          }}
          onChange={handleChange}
          style={{
            width: "100%"
          }}
        />
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          left: 0,
          top: 0,
          zIndex: 999,
          display: progress ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <CircularProgressWithLabel value={progress ? progress : 0}/>
        </div>
      </div>
    </Paper>
  )
}

export default TextAreaPanel;