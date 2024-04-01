'use client';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import type { Recipe } from 'custom-types/recipe-types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import show from '../../../styles/pages/Show.module.scss';
import IngredientsList from '../../ingredients-list';
import Instructions from '../../instructions';
import RecipeFeedback from '../../recipe-feedback';
import Tools from '../../tools';

const ShowRecipe = ({ recipe }: { recipe: Recipe }) => {
    const { data: session, status } = useSession();

    const [imageURL, setImageURL] = useState<string>(recipe.pictureURL);
    const [editLink, setEditLink] = useState<string>('');

    useEffect(() => {
        backgroundImage();
        setEditLink(window.location.href + '/edit');
    }, []);

    const backgroundImage = () => {
        setImageURL(recipe.pictureURL + '?' + recipe.timestamp);
    };

    const printRecipe = () => {
        window.print();
    };

    const setDefaultImage = () => {
        setImageURL('/placeholderpic.png');
    };

    return (
        <div className="pageContainer print-hide">
            <div className={show.recetteTitleDescriptionImgContainer}>
                <div className={show.recetteTitleContainer + ' printable'}>
                    <h2 className="printable">
                        {recipe.name}
                        {!!session ? (
                            <Link href={editLink}>
                                <CreateRoundedIcon
                                    sx={{
                                        marginLeft: 'var(--default-small-gap)',
                                    }}
                                    fontSize="large"
                                    cursor="pointer"
                                    color="secondary"
                                />
                            </Link>
                        ) : (
                            false
                        )}
                    </h2>

                    <div
                        className={
                            show.recetteShareIconsContainer + ' print-hide'
                        }
                    >
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
