import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import {Container, Grid} from "@mui/material";
import TextAreaPanel from "./components/TextAreaPanel/TextAreaPanel";
import Languages from "./scripts/languages";

function App() {
  const [sourceLanguage, setSourceLanguage] = useState<string>(Object.values(Languages)[0]);
  const [targetLanguage, setTargetLanguage] = useState<string>(Object.values(Languages)[0]);
  return (
    <Container maxWidth="lg">
      <CssBaseline enableColorScheme/>
      <header>
        <h1>Funny Translator</h1>
      </header>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Source"} language={sourceLanguage}
                                                  setLanguages={setSourceLanguage}/></Grid>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Target"} language={targetLanguage}
                                                  setLanguages={setTargetLanguage}/></Grid>
      </Grid>
    </Container>
  );
}

export default App;
