'use client';

import Introduction from '@/components/forms/recipe/introduction';

import create from '@/styles/pages/Create.module.scss';
const Create = () => {
	const handleSubmit = () => {
		console.log('coucou');
	};

	return (
		<div className="pageContainer">
			<h2 className="page-title">Create recipe</h2>
			<form onSubmit={handleSubmit} className={create.addRecipeForm}>
				<Introduction />
				<section></section>
				{/* <AddIngredients />
				<AddTools />
				<AddInstructions /> */}
			</form>
		</div>
	);
};

export default Create;
