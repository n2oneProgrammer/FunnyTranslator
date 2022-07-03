import Languages from "./languages";

class MultiTranslator {

  async translate(srcLang: Languages, tarLang: Languages, text: string):Promise<string> {
    let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + srcLang + '&tl=' + tarLang + '&dt=t&q=' + encodeURI(text);
    let res = await fetch(url);
    let json = await res.json();
    console.log(json[0][0][0]);
    return json[0][0][0];
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
  async randomPath (srcLang:Languages,tarLang:Languages, text:string, countLang:number = 10){
    let lang = srcLang;
    let t = text;
    for(let i=0;i < countLang;i++){
      let result = await this.randomTranslate(lang,t);
      lang = result.lang;
      t = result.text;
    }
    return this.translate(lang, tarLang, t);
  }
}

let multiTranslator = new MultiTranslator();
export default multiTranslator;