import React, { useState, useEffect } from "react";

type choiceProps = {
  ans: string | null
}

function App() {
  const [color, setColor] = useState<string | null>(null);
  const [ansIndex, setAnsIndex] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (!color || !ansIndex) {
      setColor(randomHex());
      setAnsIndex(getRndInteger(0, 2));
      setResult(null);
    }
  }, [color]);

  function getRndInteger (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomHex = () => {
    const r = getRndInteger(0, 255).toString(16).padStart(2, "0");
    const g = getRndInteger(0, 255).toString(16).padStart(2, "0");
    const b = getRndInteger(0, 255).toString(16).padStart(2, "0");

    const hex = "#" + r + g + b;

    return hex;
  }

  const Choice: React.FC<choiceProps> = ({ ans }) => {
    return (
      <div onClick={() => anwser(ans)} className="p-3 border rounded hover:cursor-pointer">{ans}</div>
    )
  }

  const anwser = (ans: string | null) => {
    if (result !== null) return

    if (ans === color) {
      setResult(true);
    } else {
      setResult(false);
    }
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto flex flex-col items-center">
        {result !== null &&
        <div className="text-center">
          {result ? <div>You are correct!</div>: <div>You are wrong! <br/> The correct answer is {color}</div>}
          <div onClick={() => setColor(null)} className="text-bold text-blue-400 hover:cursor-pointer hover:underline my-5">Play again</div>
        </div>
        }
        <div className="text-3xl font-bold my-5">Color Game</div>
        <div>Guess which hex is this color?</div>
        <div className="w-[50px] h-[50px] my-10" style={{ backgroundColor: color ? color : "transparent" }} />
        <div className="flex gap-5">
          <Choice ans={ansIndex == 0 ? color : randomHex()} />
          <Choice ans={ansIndex == 1 ? color : randomHex()} />
          <Choice ans={ansIndex == 2 ? color : randomHex()} />
        </div>
      </div>
    </div>
  );
}

export default App;
