'use client';

import type { Recipe } from 'custom-types/recipe-types';
import { useEffect, useState } from 'react';
import show from '../../../styles/pages/Show.module.scss';
import IngredientsList from '../../ingredients-list';
import Instructions from '../../instructions';
import RecipeFeedback from '../../recipe-feedback';
import Tools from '../../tools';

const ShowRecipe = ({ recipe }: { recipe: Recipe }) => {
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
            <div className={show.recetteTitleDescriptionImgContainer}>
                <div className={show.recetteTitleContainer + ' printable'}>
                    <h2 className="printable">{recipe.name}</h2>
                    <div
                        className={
                            show.recetteShareIconsContainer + ' print-hide'
                        }
                    >
                        {/* <img
							src="/icons/share-icon.png"
							alt="share"
							className={`icons ${show.shareIcon}`}
							onClick={sharePage}
						/> */}
                        <img
                            src="/icons/printer-icon.png"
                            alt="print"
                            className={`icons ${show.shareIcon}`}
                            onClick={printRecipe}
                        />
                    </div>
                </div>
                <h6 className="printable">{recipe.description}</h6>
                <img
                    className={show.recetteImage + ' printable'}
                    src={imageURL}
                    alt={recipe.name}
                    onError={setDefaultImage}
                />
            </div>

            <div
                className={
                    show.instructionsIngredientsToolsContainer + ' printable'
                }
            >
                <div className={show.ingredientsToolsContainer}>
                    <IngredientsList ingredients={recipe.ingredients} />
                    <Tools tools={recipe.tools} />
                </div>
                <Instructions instructions={recipe.recipe} />
            </div>
            <RecipeFeedback />
        </div>
    );
};

export default ShowRecipe;
