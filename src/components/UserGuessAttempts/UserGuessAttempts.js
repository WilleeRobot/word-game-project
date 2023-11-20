import React from "react";

import Guess from "../Guess";

function UserGuessAttempts({ renderGrid }) {
  return (
    <div className="guess-results">
      {renderGrid.map((guess) => (
        <p className="guess" key={guess.id}>
          <Guess word={guess.attempt} />
        </p>
      ))}
    </div>
  );
}

export default UserGuessAttempts;
