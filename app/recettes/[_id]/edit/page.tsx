import Create from '@/components/pages/recipes/create';
import { RecipesController } from 'controllers/recipes-controller';

// Get the recipe to edit from db to populate the default value of the form
const getRecipe = async (id: string) => {
    const response = await new RecipesController().show(id);
    return response;
};

const Page = async ({ params: { _id } }: { params: { _id: string } }) => {
    const recipeToEdit = await getRecipe(_id);
    recipeToEdit._id = String(recipeToEdit._id);
    return <Create initialData={recipeToEdit} editState={true} />;
};

export default Page;
