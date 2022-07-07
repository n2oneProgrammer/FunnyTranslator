import Languages from "./languages";

class TranslationStep {
  private readonly _language: Languages;
  private readonly _text: string;

  constructor(language: Languages, text: string) {
    this._language = language;
    this._text = text;
  }

  get language(): Languages {
    return this._language;
  }

  get text(): string {
    return this._text;
  }
}

class MultiTranslator {
  private activeTranslation: number = 0;
  private _translationSteps: TranslationStep[] = [];

  json2string(json: any) {
    let result = "";
    json[0].forEach((row: any) => result += row[0]);
    return result;
  }

  async translate(srcLang: Languages, tarLang: Languages, text: string): Promise<string> {
    let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + srcLang + '&tl=' + tarLang + '&dt=t&q=' + encodeURI(text);
    let res = await fetch(url);
    let json = await res.json();
    return this.json2string(json);
  }

  async randomTranslate(srcLang: Languages, text: string) {
    let languageValues = Object.values(Languages);
    let randomTarget = languageValues[Math.floor(Math.random() * languageValues.length)];
    let result = await this.translate(srcLang, randomTarget, text);
    return {
      lang: randomTarget,
      text: result
    }
  }

  async randomPath(srcLang: Languages, tarLang: Languages, text: string, countLang: number = 10, changeProgress: (v1: number) => void) {
    let translationId = Date.now();
    this._translationSteps = [new TranslationStep(srcLang,text)];
    this.activeTranslation = translationId;
    let lang = srcLang;
    let t = text;
    for (let i = 0; i < countLang; i++) {
      if (translationId !== this.activeTranslation) return "";
      let result = await this.randomTranslate(lang, t);
      lang = result.lang;
      t = result.text;
      this._translationSteps.push(new TranslationStep(lang, t));
      changeProgress((i + 1) / countLang * 100);
    }
    this.activeTranslation = 0;
    let result = await this.translate(lang, tarLang, t);
    this._translationSteps.push(new TranslationStep(tarLang, result));
    return result;
  }

  get translationSteps(): TranslationStep[] {
    return this._translationSteps;
  }
}

let multiTranslator = new MultiTranslator();
export default multiTranslator;