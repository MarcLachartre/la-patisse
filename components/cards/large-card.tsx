'use client';

import Link from 'next/link';
import React from 'react';
import lc from '../../styles/components/LargeCard.module.scss';

interface Id {
    id: string;
}

const LargeCard = (props: Id) => {
    return (
        <Link
            href={`/recettes/${props.id.slice(1, -1)}`}
            className={lc.largeCardContainer}
        >
            <img
                className={lc.largeCardImage}
                src="https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png"
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
