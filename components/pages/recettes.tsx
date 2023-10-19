'use client';

import React, { useState, useEffect } from 'react';

import { Recipe } from 'custom-types/recipe-types';

import recettes from '../../styles/pages/Recettes.module.scss';
import LargeCard from '../../components/cards/large-card';
import SmallCard from '../../components/cards/small-card';
import Footer from '../../components/footer';

const Recettes = ({ recipes }: { recipes: Recipe[] }) => {
	useEffect(() => {
		async function animate() {
			const scrollreveal = (await require('scrollreveal')).default;
			scrollreveal().reveal('.recipe-card');
		}
		animate();
	});

	const displayRecipes = () => {
		return (
			<div className={recettes.recettesGrid}>
				{recipes.map((recipe: Recipe) => (
					<div className="recipe-card" key={recipe._id}>
						<SmallCard recipe={recipe} />
					</div>
				))}
			</div>
		);
	};

	const favCakeId = () => {
		const cake: Recipe[] = recipes.filter((r) => {
			return r.name === 'Gâteau au Fromage Blanc' ? r._id : '';
		});
		return cake[0]._id;
	};

	return (
		<div className="pageContainer">
			<div className={recettes.recettesSection}>
				<h2>Le pref...</h2>
				<LargeCard id={favCakeId()} />
			</div>
			<div
				className={`${recettes.recettesSection} ${recettes.recettesList}`}
			>
				<h2>Delicatessen</h2>
				{displayRecipes()}
			</div>
			<Footer />
		</div>
	);
};

export default Recettes;
