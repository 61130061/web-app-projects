import React from "react";

type KeypadProps = {
	onClick: React.MouseEventHandler
}

const keybaord = [
  '7','8','9','/',
  '4','5','6','*',
  '1','2','3','-',
  '0','.','ans','+'
];

const Keypad: React.FC<KeypadProps> = ({ onClick }) => {
	return (
		<div className="grid grid-cols-4 gap-1" >
			{
				keybaord.map((data, index) =>
					<div
						className="flex justify-center p-2 border border-black rounded hover:cursor-pointer hover:bg-slate-200"
						key={index}
						id={data}
						onClick={onClick}
					>
						{data}
					</div>
				)
			}
		</div>
	);
}

export default Keypad;