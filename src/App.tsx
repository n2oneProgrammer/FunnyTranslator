import React, {useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import {Container, Grid} from "@mui/material";
import TextAreaPanel from "./components/TextAreaPanel";
import Languages from "./scripts/languages";
import multiTranslator from "./scripts/multiTranslator";
import BottomBar from "./components/BottomBar";

let delayDebounceFn: any = 0;

function App() {
  const [sourceLanguage, setSourceLanguage] = useState<Languages>(Object.values(Languages)[0]);
  const [sourceValue, setSourceValue] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<Languages>(Object.values(Languages)[0]);
  const [targetValue, setTargetValue] = useState<string>("");

  const translate = async (source:Languages, target:Languages, text:string) => {
    if (source == null || target == null || text == null) return;
    console.log(source, target, text);
    if (text === "") {
      setTargetValue("");
      return;
    }
    let result = await multiTranslator.randomPath(source, target, text);
    setTargetValue(result);
  };
  useEffect(() => {
    translate(sourceLanguage, targetLanguage, sourceValue);
  }, [targetLanguage, sourceLanguage]);
  const changeSourceValue = (value: string) => {
    setSourceValue(value);
    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => translate(sourceLanguage, targetLanguage, value), 400);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline enableColorScheme/>
      <header>
        <h1>Funny Translator</h1>
      </header>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Source"} language={sourceLanguage}
                                                  setLanguages={setSourceLanguage}
                                                  value={sourceValue}
                                                  setValue={changeSourceValue}/></Grid>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Target"} language={targetLanguage}
                                                  setLanguages={setTargetLanguage}
                                                  value={targetValue}
                                                  setValue={setTargetValue}/></Grid>
      </Grid>
      <BottomBar onTranslateButtonClick={()=>translate(sourceLanguage,targetLanguage,sourceValue)}/>
    </Container>
  );
}

export default App;