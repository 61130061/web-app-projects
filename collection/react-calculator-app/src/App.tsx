import React, { useState, useEffect } from 'react';
import Keypad from './components/Keypad';

type historyAns = {
  input: string,
  ans: number | undefined
}

function App() {
  const [input, setInput] = useState<string>('');
  const [ans, setAns] = useState<number | undefined>(0);
  const [historyAns, setHistory] = useState<historyAns[]>([]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setInput(input + (e.target as HTMLInputElement).id);
  };

  useEffect(() => {
    if (input !== '') {
      computer();
    } else {
      setAns(0);
    }
  }, [input])

  const computer = () => {
    if (typeof ans == "undefined") {
      return
    }

    setAns(ans+1);
  }

  const saveAns: React.MouseEventHandler<HTMLDivElement> = () => {
    if (input === '') {
      return
    }

    setHistory([...historyAns, { input, ans }]);
    setInput('');
    setAns(0);
  }

  return (
    <div className="h-screen bg-slate-300 flex">
      <div className="m-auto w-[400px]">
        <div className="text-4xl font-bold my-3">Calculator</div>
        <div className="border border-black rounded h-[300px] overflow-y-auto">
          {historyAns.map((data, index) =>
            <div key={index} className="flex justify-between p-3 border-b border-black">
              <div>{data.input}</div>
              <div>= {data.ans}</div>
            </div>
          )}
        </div>
        <div className="flex border border-black rounded my-1 bg-slate-200 text-xl">
          <input
            className="p-3 bg-transparent flex-1"
            placeholder="1 + 1"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex items-center p-2">
            = {ans} 
          </div>
        </div>

        <Keypad onClick={handleClick} />

        <div
          onClick={saveAns}
          className="p-2 flex justify-center border border-black my-1 rounded hover:cursor-pointer hover:bg-slate-200"
        >
          Enter
        </div>

      </div>
    </div>
  );
}

export default App;
