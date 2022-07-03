import {Grid, Paper} from "@mui/material";
import React from "react";
import LanguageSelect from "../LanguageSelect/LanguageSelect";

interface Props {
  text: string,
  language:string,
  setLanguages: (newValue:string)=>void
}

function TextAreaPanel({text,language,setLanguages}: Props) {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{
          margin: "auto",
          fontSize: "2rem",
          paddingLeft: "40px"
        }}> {text}</Grid>
        <Grid item xs={6}><LanguageSelect language={language} setLanguage={setLanguages}/></Grid>
      </Grid>
    </Paper>
  )
}

export default TextAreaPanel;