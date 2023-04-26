import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import lc from '../../styles/components/LargeCard.module.scss';
import arrow from '../../styles/components/ArrowIcon.module.scss';

interface Id {
	id: string;
}

const LargeCard = (props: Id) => {
	return (
		<Link href={`/recettes/${props.id}`} className={lc.largeCardContainer}>
			<img
				className={lc.largeCardImage}
				src="/gateau-au-fromage-blanc.png"
				alt="favorite cake"
			></img>
			<div className={lc.largeCardDescriptionContainer}>
				<h3> Käsekuchen</h3>
				<p>
					Sehr gute, cette recette allemande de gâteau au fromage
					blanc qui n'a rien à voir avec le cheesecake a bercé mon
					enfance avec sa texture légère et son goût unique!
				</p>
			</div>
		</Link>
	);
};

export default LargeCard;
