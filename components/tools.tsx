import React from 'react';
import tools from '../styles/components/Tools.module.scss';

interface Tools {
	tools: string[];
}

const Tools = (props: Tools) => {
	return (
		<div className={tools.toolsContainer}>
			<h3>Matériel</h3>
			{props.tools.map((tool, index) => (
				<li key={`tool${index}`}>{tool}</li>
			))}
		</div>
	);
};

export default Tools;
