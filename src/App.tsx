import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import {Container, Grid} from "@mui/material";
import TextAreaPanel from "./components/TextAreaPanel";
import Languages from "./scripts/languages";
import multiTranslator from "./scripts/multiTranslator";
import BottomBar from "./components/BottomBar";
import settings from "./scripts/settings";
import PathTable from "./components/PathTable";

let delayDebounceFn: any = 0;

function App() {
  const [sourceLanguage, setSourceLanguage] = useState<Languages>(settings.sourceLanguage);
  const [sourceValue, setSourceValue] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<Languages>(settings.targetLanguage);
  const [targetValue, setTargetValue] = useState<string>("");
  const [translateProgress, setTranslateProgress] = useState<number | undefined>(undefined);
  const translate = async (source: Languages, target: Languages, text: string) => {
    if (source == null || target == null || text == null) return;
    console.log(source, target, text);
    if (text === "") {
      setTargetValue("");
      return;
    }
    let result = await multiTranslator.randomPath(source, target, text, settings.pathLength, changeTranslateProgress);
    setTargetValue(result);
  };
  const changeSourceValue = (value: string) => {
    setSourceValue(value);
    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => translate(sourceLanguage, targetLanguage, value), 400);
  };
  const changeSourceLanguage = (value: Languages) => {
    settings.sourceLanguage = value;
    translate(value, targetLanguage, sourceValue);
    setSourceLanguage(value);

  };
  const changeTargetLanguage = (value: Languages) => {
    settings.targetLanguage = value;
    translate(sourceLanguage, value, sourceValue);
    setTargetLanguage(value);
  };
  const changeTranslateProgress = (progress: number) => {
    if (progress >= 100 || progress < 0) {
      setTranslateProgress(undefined);
      return;
    }
    console.log(progress, progress >= 100);
    setTranslateProgress(progress)
  }
  return (
    <Container maxWidth="lg">
      <CssBaseline enableColorScheme/>
      <header>
        <h1>Funny Translator</h1>
      </header>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Source"} language={sourceLanguage}
                                                  setLanguages={changeSourceLanguage}
                                                  value={sourceValue}
                                                  setValue={changeSourceValue}/></Grid>
        <Grid item xs={12} md={6}> <TextAreaPanel text={"Target"} language={targetLanguage}
                                                  setLanguages={changeTargetLanguage}
                                                  value={targetValue}
                                                  setValue={setTargetValue}
                                                  isReadOnly={true}
                                                  progress={translateProgress}
        /></Grid>
      </Grid>
      <BottomBar onTranslateButtonClick={() => translate(sourceLanguage, targetLanguage, sourceValue)}/>
      <PathTable />
    </Container>
  );
}

export default App;
