import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Definitions from "./components/Definitions/Definitions";
import Header from "./components/Header/Header";

function App() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [LightTheme, setLightTheme] = useState(false);

  const dictionaryApi = async () => {
    try {
      setError('');
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      setError(error?.response?.data?.title || 'No Definitions Found');
    }
  };
  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word]);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: LightTheme ? "#fff" : "#282c34",
        color: LightTheme ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <label for="mode-switch">{LightTheme ? "Dark" : "Light"} Mode</label>
          <PurpleSwitch
            id="mode-switch"
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>
        <Header
          setWord={setWord}
          word={word}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
        />
        {meanings && (
          <Definitions
            meanings={meanings}
            word={word}
            LightTheme={LightTheme}
            error={error}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
