'use client';

import style from '@/styles/components/Instructions.module.scss';

interface Instructions {
	instructions: string[];
}

const Instructions = (props: Instructions) => {
	return (
		<div className={style.instructionsContainer}>
			<h3>Préparation</h3>
			{props.instructions.map((instruction, index) => (
				<div
					className={style.instructionLine}
					key={`instruction${index}`}
				>
					<div className={style.instructionNumber}>
						<h5>{index + 1}</h5>
					</div>
					<p>{instruction}</p>
				</div>
			))}
		</div>
	);
};

export default Instructions;
