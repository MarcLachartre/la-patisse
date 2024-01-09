'use client';

import { Recipe } from 'custom-types/recipe-types';
import React, { useEffect } from 'react';
import index from '../../../styles/pages/Index.module.scss';
import LargeCard from '../../cards/large-card';
import SmallCard from '../../cards/small-card';

const Index = ({ recipes }: { recipes: Recipe[] }) => {
    useEffect(() => {
        async function animate() {
            const scrollreveal = (await require('scrollreveal')).default;
            scrollreveal({ distance: '60px' }).reveal('.recipe-card', {
                origin: 'bottom',
                duration: 1000,
            });
        }
        animate();
    });

    const displayRecipes = () => {
        return (
            <div className={index.recettesGrid}>
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
            <div className={index.recettesSection}>
                <h2>Le pref...</h2>
                <LargeCard id={favCakeId()} />
            </div>
            <div className={`${index.recettesSection} ${index.recettesList}`}>
                <h2>Delicatessen</h2>
                {displayRecipes()}
            </div>
        </div>
    );
};

export default Index;
