import { createTheme, TextField, ThemeProvider } from "@material-ui/core";
import React from "react";
import "./Header.css";
import { debounce } from "lodash";

const Header = ({
  setWord,
  LightTheme,
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const handleText = debounce((text) => {
    setWord(text);
  }, 500);

  return (
    <div className="header">
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            variant="outlined"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
            fullWidth
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
