'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import sc from '../../styles/components/SmallCard.module.scss';

interface Recipe {
	_id: string;
	name: string;
	description: string;
}

const SmallCard = (props: Recipe) => {
	const [imageURL, setImageURL] = useState<string>('');

	useEffect(() => {
		backgroundImage();
	}, []);

	const backgroundImage = () => {
		setImageURL(
			'/' +
				props.name
					.replace(/ /g, '-')
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase() +
				'.png'
		);
	};

	const setDefaultImage = () => {
		setImageURL('/placeholderpic.png');
	};

	return (
		<div id={props._id} className={sc.smallCardContainer}>
			<Link
				href={'recettes/' + props._id}
				className={sc.smallCardLink}
			></Link>
			<img
				className={sc.smallCardImage}
				src={imageURL}
				onError={setDefaultImage}
				loading="lazy"
			></img>
			<div className={sc.smallCardDescription}>
				<h4>{props.name}</h4>
				<p>{props.description}</p>
			</div>
		</div>
	);
};

export default SmallCard;
