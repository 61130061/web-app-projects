import React, { HTMLAttributeAnchorTarget, MouseEventHandler, useState } from 'react';

const keypad = [
  'C', '+/-', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'del', '0', '.', '='
]

function App() {
  const [output, setOutput] = useState<string>('0');

  const onClick= (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    // Pressing del
    if (id == 'del') {
      let newOutput = output.slice(0, -1);

      if (newOutput == '') {
        newOutput = '0';
      }

      setOutput(newOutput);
    }

    // Pressing numbers
    else if (parseFloat(id) || parseFloat(id) == 0) {
      const newOutput = output + id;

      setOutput(parseFloat(newOutput).toString());
    }
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto border rounded">
        <div className="text-4xl p-5 text-right">{output}</div>
        <div className="grid grid-cols-4">
          {keypad.map((data, index) => 
            <div 
              key={index} 
              id={data}
              onClick={onClick}
              className="text-center py-5 px-8 border hover:cursor-pointer"
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
