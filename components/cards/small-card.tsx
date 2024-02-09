'use client';

import { Recipe } from 'custom-types/recipe-types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import sc from '../../styles/components/SmallCard.module.scss';

const SmallCard = ({ recipe }: { recipe: Recipe }) => {
    const [imageURL, setImageURL] = useState<string>('');

    useEffect(() => {
        backgroundImage();
    }, []);

    const backgroundImage = () => {
        console.log(recipe.pictureURL + '?' + recipe.timestamp);
        setImageURL(recipe.pictureURL + '?' + recipe.timestamp);
    };

    const setDefaultImage = () => {
        setImageURL('/placeholderpic.png');
    };

    return (
        <div id={recipe._id} className={sc.smallCardContainer}>
            <Link
                href={`recettes/${recipe._id.slice(1, -1)}`}
                className={sc.smallCardLink}
            ></Link>
            <img
                className={sc.smallCardImage}
                src={imageURL}
                onError={setDefaultImage}
                // loading="lazy"
            ></img>
            <div className={sc.smallCardDescription}>
                <h4>{recipe.name}</h4>
                <p>{recipe.description}</p>
            </div>
        </div>
    );
};

export default SmallCard;
