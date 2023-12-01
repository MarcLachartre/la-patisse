'use client';

import style from '@/styles/components/Instructions.module.scss';

const CreateInstruction = () => {
	return (
		<div className={style.instructionsContainer}>
			<h3>Préparation</h3>
			{/* {props.instructions.map((instruction, index) => (
				<div
					className={instructions.instructionLine}
					key={`instruction${index}`}
				>
					<div className={instructions.instructionNumber}>
						<h5>{index + 1}</h5>
					</div>
					<p>{instruction}</p>
				</div>
			))} */}
		</div>
	);
};

export default CreateInstruction;
