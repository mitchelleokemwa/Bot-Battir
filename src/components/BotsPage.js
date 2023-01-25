

import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  function enlist(bot) {
    if (army.includes(bot)) return;
    setArmy((army) => [...army, bot]);
  }
  function retire(bot) {
    setArmy((army) => army.filter((it) => it.id !== bot.id));
  }
  useEffect(() => {
    fetch("https://okemwa-bot-battlr.vercel.app/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  function handleDelete(bot) {
    fetch(`https://okemwa-bot-battlr.vercel.app/bots/${bot.id}`, {
      method: "DELETE",
    }).then(() => {
      setBots((bots) => bots.filter((it) => it.id !== bot.id));
      setArmy((army) => army.filter((it) => it.id !== bot.id));
    });
  }

  function deleteHandler() {}
  return (
    <div>
      <YourBotArmy collection={army} clickHandler={retire} handleDelete={handleDelete} />
      <BotCollection collection={bots} clickHandler={enlist} handleDelete={handleDelete} />
   </div>
  );
}

export default BotsPage;