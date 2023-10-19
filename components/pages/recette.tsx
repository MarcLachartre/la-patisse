'use client';

import { useEffect, useState } from 'react';

import recette from '../../styles/pages/Recette.module.scss';
import Footer from '../../components/footer';
import IngredientsList from '../../components/ingredients-list';
import Tools from '../../components/tools';
import Instructions from '../../components/instructions';
import RecipeFeedback from '../../components/recipe-feedback';

import type { Recipe } from 'custom-types/recipe-types';

const Recette = ({ recipe }: { recipe: Recipe }) => {
	const [imageURL, setImageURL] = useState<string>('/cake-au-citron.png');

	useEffect(() => {
		backgroundImage();
	}, []);

	const backgroundImage = () => {
		setImageURL(`${recipe.pictureURL}`);
	};

	const printRecipe = () => {
		window.print();
	};

	// const sharePage = () => {
	// 	const title = recipe.name;
	// 	const text = 'La meilleure recette de ' + recipe.name;
	// 	const url = window.location.href;
	// 	navigator
	// 		.share({
	// 			title: title,
	// 			text: text,
	// 			url: url,
	// 		})
	// 		.then(() => {
	// 			console.log('Shared successfully.');
	// 		})
	// 		.catch((error) => {
	// 			console.log('There was an error sharing:', error);
	// 		});
	// };

	const setDefaultImage = () => {
		setImageURL('/placeholderpic.png');
	};

	return (
		<div className="pageContainer print-hide">
			<div className={recette.recetteTitleDescriptionImgContainer}>
				<div className={recette.recetteTitleContainer + ' printable'}>
					<h2 className="printable">{recipe.name}</h2>
					<div
						className={
							recette.recetteShareIconsContainer + ' print-hide'
						}
					>
						{/* <img
							src="/icons/share-icon.png"
							alt="share"
							className={`icons ${recette.shareIcon}`}
							onClick={sharePage}
						/> */}
						<img
							src="/icons/printer-icon.png"
							alt="print"
							className={`icons ${recette.shareIcon}`}
							onClick={printRecipe}
						/>
					</div>
				</div>
				<h6 className="printable">{recipe.description}</h6>
				<img
					className={recette.recetteImage + ' printable'}
					src={imageURL}
					alt={recipe.name}
					onError={setDefaultImage}
				/>
			</div>

			<div
				className={
					recette.instructionsIngredientsToolsContainer + ' printable'
				}
			>
				<div className={recette.ingredientsToolsContainer}>
					<IngredientsList ingredients={recipe.ingredients} />
					<Tools tools={recipe.tools} />
				</div>
				<Instructions instructions={recipe.recipe} />
			</div>
			<RecipeFeedback />
			<Footer />
		</div>
	);
};

export default Recette;
