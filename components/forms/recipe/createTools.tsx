import style from '@/styles/components/Tools.module.scss';

const CreateTools = () => {
	return (
		<div className={style.toolsContainer}>
			<h3>Matériel</h3>
			{/* {props.tools.map((tool, index) => (
				<li key={`tool${index}`}>{tool}</li>
			))} */}
		</div>
	);
};

export default CreateTools;
