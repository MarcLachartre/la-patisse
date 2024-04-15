import Create from '@/components/pages/recipes/create';
import { RecipesController } from 'controllers/recipes-controller';
export const dynamic = 'force-dynamic';

// Get the recipe to edit from db to populate the default value of the form
const getRecipe = async (name: string) => {
    const response = await new RecipesController().show(name);
    return response;
};

const Page = async ({ params: { name } }: { params: { name: string } }) => {
    const recipeToEdit = await getRecipe(name);
    recipeToEdit._id = String(recipeToEdit._id);
    return <Create initialData={recipeToEdit} editState={true} />;
};

export default Page;
