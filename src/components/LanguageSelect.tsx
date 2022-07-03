import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Languages from "../scripts/languages";
interface Props{
  language: Languages,
  setLanguage: (newValue: Languages)=>void
}
function LanguageSelect({language,setLanguage}:Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as Languages);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={(language)}
        label="Language"
        onChange={handleChange}
      >
        {Object.keys(Languages).map((lang,index)=>(<MenuItem key={lang} value={Object.values(Languages)[index]}>{lang}</MenuItem>))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelect;