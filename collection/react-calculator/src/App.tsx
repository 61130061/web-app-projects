import React, { useState } from 'react';

const keypad = [
  'C', '+/-', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'del', '0', '.', '='
]

const operators = ['+', '-', '/', '*']

function computer (a: number, op: string, b: number) {
  let ans = null;
  if(op === '+') ans = a + b;
  else if (op === '-') ans = a - b;
  else if (op === '*') ans = a * b;
  else if (op === '/') ans = a / b;

  return ans;
}

function App() {
  const [fInput, setFInput] = useState<number | null>(null);
  const [selop, setSelop] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);

  const onClick= (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    // Pressing del
    if (id == 'del' && output) {
      let newOutput = output.slice(0, -1);

      if (newOutput == '') {
        newOutput = '0';
      }

      setOutput(newOutput);
    }

    else if (id == 'C') {
      setOutput(null);
      setFInput(null);
      setSelop(null);
    }

    else if (id == '=') {
      if (output && selop) {
        const ans = fInput ? computer(fInput, selop, parseFloat(output)) : computer(0, selop, parseFloat(output));
        setFInput(ans);
        setOutput(null);
        setSelop(null);
      }
    }

    else if (operators.includes(id)) {
      if (output && selop) {
        const ans = fInput ? computer(fInput, selop, parseFloat(output)) : computer(0, selop, parseFloat(output));
        setFInput(ans);
        setSelop(id);
        setOutput(null);
        return
      }
      else if (output) {
        setFInput(parseFloat(output));
        setSelop(id);
        setOutput(null);
        return
      }

      setSelop(id);
    }

    // Pressing numbers
    else if (parseFloat(id) || parseFloat(id) == 0) {
      if (output) {
        setOutput(parseFloat(output + id).toString());
      } else {
        setOutput(parseFloat(id).toString());
      }
    }
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto border rounded">
        <div className="text-4xl p-5 text-right">
          {output ? output : (fInput ? fInput : 0)}
        </div>
        <div className="grid grid-cols-4">
          {keypad.map((data, index) => 
            <div 
              key={index} 
              id={data}
              onClick={onClick}
              className={"text-center py-5 px-8 border hover:cursor-pointer" + (selop == data && ' border-yellow-300')}
            >
              {data}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
