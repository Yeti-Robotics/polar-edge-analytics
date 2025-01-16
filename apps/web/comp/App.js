import React, { useState } from "react";
import { useForm } from "react-hook-form";

const GameForm = () => {
  const { register, handleSubmit } = useForm();
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  const [level4, setLevel4] = useState(0);
  const [algaeProcessed, setAlgaeProcessed] = useState(0);
  const [algaeNetted, setAlgaeNetted] = useState(0);

  const onSubmit = (data) => {
    console.log({
      ...data,
      scores: {
        level1,
        level2,
        level3,
        level4,
        algaeProcessed,
        algaeNetted,
      },
    });
  };

  const adjustScore = (currentValue, setValue, adjustment) => {
    const newValue = currentValue + adjustment;
    setValue(Math.max(newValue, 0)); // Prevents negative numbers
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Match Details</h2>
      <label>
        Match Number:
        <input {...register("matchNumber")} type="number" />
      </label>
      <label>
        Team Number:
        <input {...register("teamNumber")} type="number" />
      </label>

      <h2>Auto</h2>
      <label>
        Left black line:
        <input {...register("auto.leftBlackLine")} type="checkbox" />
      </label>

      <div>
        <label>Level 1:</label>
        <button
          type="button"
          onClick={() => adjustScore(level1, setLevel1, -1)}
        >
          -
        </button>
        <span>{level1}</span>
        <button
          type="button"
          onClick={() => adjustScore(level1, setLevel1, 1)}
        >
          +
        </button>
      </div>

      <div>
        <label>Level 2:</label>
        <button
          type="button"
          onClick={() => adjustScore(level2, setLevel2, -1)}
        >
          -
        </button>
        <span>{level2}</span>
        <button
          type="button"
          onClick={() => adjustScore(level2, setLevel2, 1)}
        >
          +
        </button>
      </div>

      <div>
        <label>Level 3:</label>
        <button
          type="button"
          onClick={() => adjustScore(level3, setLevel3, -1)}
        >
          -
        </button>
        <span>{level3}</span>
        <button
          type="button"
          onClick={() => adjustScore(level3, setLevel3, 1)}
        >
          +
        </button>
      </div>

      <div>
        <label>Level 4:</label>
        <button
          type="button"
          onClick={() => adjustScore(level4, setLevel4, -1)}
        >
          -
        </button>
        <span>{level4}</span>
        <button
          type="button"
          onClick={() => adjustScore(level4, setLevel4, 1)}
        >
          +
        </button>
      </div>

      <div>
        <label>
          Algae processed:
          <button
            type="button"
            onClick={() => adjustScore(algaeProcessed, setAlgaeProcessed, -1)}
          >
            -
          </button>
          <span>{algaeProcessed}</span>
          <button
            type="button"
            onClick={() => adjustScore(algaeProcessed, setAlgaeProcessed, 1)}
          >
            +
          </button>
        </label>
      </div>

      <div>
        <label>
          Algae Netted:
          <button
            type="button"
            onClick={() => adjustScore(algaeNetted, setAlgaeNetted, -1)}
          >
            -
          </button>
          <span>{algaeNetted}</span>
          <button
            type="button"
            onClick={() => adjustScore(algaeNetted, setAlgaeNetted, 1)}
          >
            +
          </button>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default GameForm;