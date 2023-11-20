import React, { useState } from "react";

function UserGuessForm({ updateGuessList, isGameOver }) {
  const [guess, setGuess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userInput = guess.toUpperCase().trim().split(" ").join("");

    updateGuessList(userInput);
    setGuess("");
  }

  return (
    <div>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          required
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          // minLength={5}
          // maxLength={5}
          title="A 5 letter word with no spaces"
          pattern="[a-zA-Z]{5}"
          disabled={isGameOver}
        />
      </form>
    </div>
  );
}

export default UserGuessForm;
