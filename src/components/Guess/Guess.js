import React from "react";
import { range } from "../../utils";

function Guess({ word }) {
  if (word.length === 0) {
    return range(5).map(() => (
      <span key={crypto.randomUUID()} className="cell"></span>
    ));
  }

  return (
    <>
      {word.map((position) => {
        return (
          <span key={crypto.randomUUID()} className={`cell ${position.status}`}>
            {position.letter}
          </span>
        );
      })}
    </>
  );
}

export default Guess;
