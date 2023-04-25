import React, { useEffect, useState } from 'react';

import recettes from '../styles/pages/Recettes.module.scss';
import LargeCard from '../components/cards/large-card';
import SmallCard from '../components/cards/small-card';
import Footer from '../components/footer';

import { RecipeController } from '../controllers/recipe-controller';

interface Recipe {
	_id: string;
	name: string;
	description: string;
}

const Recettes = (props: any) => {
	const [recipes, setRecipes] = useState<Recipe[]>(JSON.parse(props.data));

	const displayRecipes = () => {
		return (
			<div className={recettes.recettesGrid}>
				{recipes.map((recipe: any) => (
					<SmallCard
						_id={recipe._id}
						name={recipe.name}
						description={recipe.description}
						key={recipe._id}
					/>
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

//retrieve all recipes to populate the recettes page
export const getServerSideProps = async () => {
	const recipes: Recipe[] = await new RecipeController().index();
	const data: string = JSON.stringify(recipes);

	return {
		props: { data }, // will be passed to the page component as props
	};
};

export default Recettes;
