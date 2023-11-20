import React, { useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import UserGuessForm from "../UserGuessForm";
import UserGuessAttempts from "../UserGuessAttempts";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";
import { checkGuess } from "../../game-helpers.js";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  let renderGrid = [];
  range(NUM_OF_GUESSES_ALLOWED).map(() =>
    renderGrid.push({ id: crypto.randomUUID(), attempt: [] })
  );

  const [guessList, setGuessList] = useState(renderGrid);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [isCorrectWord, setIsCorrectWord] = useState(false);

  function handleUpdateGuessList(guessAttempt) {
    console.log("[handling_guess]: INPUT: ", guessAttempt);

    const wordStatus = checkGuess(guessAttempt, answer);

    const newInput = {
      id: crypto.randomUUID(),
      attempt: wordStatus,
    };
    const updatedList = [...guessList];
    const updateIndexPosition = updatedList.findIndex(
      (el) => el.attempt.length === 0
    );

    updatedList[updateIndexPosition] = newInput;
    console.log("UPDATED LIST TO RENDER: ", updatedList);
    setGuessList(updatedList);
    setGuessAttempts((prevState) => prevState + 1);

    // Check guess
    if (guessAttempt === answer.toUpperCase()) {
      setIsCorrectWord(true);
      setIsGameOver(true);
      return;
    }
    if (guessAttempts === NUM_OF_GUESSES_ALLOWED - 1) {
      setIsGameOver(true);
      return;
    }
  }

  console.log("CURRENT_GUESS_LIST: ", guessList);

  console.log("MOST RECENT IN LIST: ", guessList);
  return (
    <>
      <UserGuessAttempts renderGrid={guessList} />
      {isGameOver ? (
        isCorrectWord ? (
          <div className="happy banner">
            <p>
              <strong>Congratulations!</strong> Got it in
              <strong>{` ${guessAttempts} ${
                guessAttempts === 1 ? "guess" : "guesses"
              }`}</strong>
              .
            </p>
          </div>
        ) : (
          <div className="sad banner">
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
          </div>
        )
      ) : null}
      <UserGuessForm
        isGameOver={isGameOver}
        updateGuessList={handleUpdateGuessList}
      />
    </>
  );
}

export default Game;
