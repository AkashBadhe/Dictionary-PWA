import React from "react";
import "./Definitions.css";

const Definitions = ({ meanings, word, LightTheme, category, error }) => {

  const phonetic = meanings[0]?.phonetics?.filter(f => f.audio)[0];

  const getDefinition = () => {
    if (error) {
      return <div
        className="singleMean"
        style={{
          color: LightTheme ? "black" : "white",
        }}>
        <span><b>{error}</b></span>
      </div>
    }
    return meanings.map((mean) =>
      mean.meanings.map((item) =>
        item.definitions.map((def) => (
          <div
            className="singleMean"
            style={{
              color: LightTheme ? "black" : "white",
            }}
          >
            <span><b>Definition:</b> {def.definition}</span>

            {def?.example?.length > 0 && def?.synonyms?.length > 0 && <hr style={{ backgroundColor: "black", width: "100%" }} />}
            {def.example && def.example.length > 0 && (
              <span>
                <b>Example :</b> {def.example}
              </span>
            )}
            {def.synonyms && def.synonyms.length > 0 && (
              <span>
                <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
              </span>
            )}
          </div>
        ))
      )
    )
  }
  return (
    <>
      {(phonetic?.audio || phonetic?.text) && <div id="audio">
        {phonetic?.text && <p>Pronounciation: <b>{phonetic?.text}</b></p>}
        {phonetic?.audio && <audio controls>
          <source src={phonetic?.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>}
      </div>
      }

      <div className="meanings">
        {word === "" ? (
          <span className="subTitle">Start by typing a word in search</span>
        ) : (
          getDefinition()
        )}
      </div>
    </>
  );
};

export default Definitions;
