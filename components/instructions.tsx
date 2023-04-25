import React from 'react';

import instructions from '../styles/components/Instructions.module.scss';

interface Instructions {
	instructions: string[];
}

const Instructions = (props: Instructions) => {
	return (
		<div className={instructions.instructionsContainer}>
			<h3>Préparation</h3>
			{props.instructions.map((instruction, index) => (
				<div
					className={instructions.instructionLine}
					key={`instruction${index}`}
				>
					<div className={instructions.instructionNumber}>
						<h5>{index + 1}</h5>
					</div>
					<h6>{instruction}</h6>
				</div>
			))}
		</div>
	);
};

export default Instructions;
