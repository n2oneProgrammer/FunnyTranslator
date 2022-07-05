import Cookies from 'universal-cookie';
import Languages from "./languages";

const cookies = new Cookies();

class Settings{
  private _sourceLanguage: Languages;
  private _targetLanguage: Languages;
  private _pathLength: number;
  constructor() {
    this._sourceLanguage = cookies.get("sourceLanguage") || Languages.Polish;
    this._targetLanguage = cookies.get("targetLanguage") || Languages.Polish;
    this._pathLength = cookies.get("pathLength") || 10;
  }

  get sourceLanguage(): Languages {
    return this._sourceLanguage;
  }

  set sourceLanguage(value: Languages) {
    cookies.set("sourceLanguage",value);
    this._sourceLanguage = value;
  }

  get targetLanguage(): Languages {
    return this._targetLanguage;
  }

  set targetLanguage(value: Languages) {
    cookies.set("targetLanguage",value);
    this._targetLanguage = value;
  }

  get pathLength(): number {
    return this._pathLength;
  }

  set pathLength(value: number) {
    if(value < 0 ){
      value = 0;
    }
    if(value > 90){
      value = 90
    }

    cookies.set("pathLength",value);
    this._pathLength = value;
  }
}
let settings = new Settings();
export default settings;