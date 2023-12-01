'use client';

import style from '../styles/components/Tools.module.scss';

interface Tools {
	tools: string[];
}

const Tools = (props: Tools) => {
	return (
		<div className={style.toolsContainer}>
			<h3>Matériel</h3>
			<ul>
				{props.tools.map((tool, index) => (
					<li key={`tool${index}`}>{tool}</li>
				))}
			</ul>
		</div>
	);
};

export default Tools;
