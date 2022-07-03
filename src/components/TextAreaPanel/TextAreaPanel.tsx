import {Grid, Paper, TextField} from "@mui/material";
import React from "react";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import Languages from "../../scripts/languages";

interface Props {
  text: string,
  language: Languages,
  setLanguages: (newValue: Languages) => void,
  value: string,
  setValue: (newValue: string) => void
}

function TextAreaPanel({text, language, setLanguages,value,setValue}: Props) {
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
      <TextField
        id="outlined-multiline-flexible"
        label={text}
        multiline
        minRows={6}
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          marginTop:20
        }}
      />
    </Paper>
  )
}

export default TextAreaPanel;