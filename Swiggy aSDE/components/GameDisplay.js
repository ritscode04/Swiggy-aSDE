import React, { useState } from "react";
import axios from "../services/api";

const GameDisplay = () => {
  const [log, setLog] = useState([]);
  const [winner, setWinner] = useState("");

  const startBattle = async () => {
    const response = await axios.post("/battle", {
      playerAData: { name: "Player A", health: 50, strength: 5, attack: 10 },
      playerBData: { name: "Player B", health: 100, strength: 10, attack: 5 },
    });
    setWinner(response.data.winner);
    setLog(response.data.log);
  };

  return (
    <div>
      <button onClick={startBattle}>Start Battle</button>
      {winner && <h2>Winner: {winner}</h2>}
      <ul>
        {log.map((entry, index) => (
          <li key={index}>
            {entry.attacker} attacked {entry.defender}, dealt {entry.damage} damage. {entry.defender} remaining health: {entry.remainingHealth}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameDisplay;
