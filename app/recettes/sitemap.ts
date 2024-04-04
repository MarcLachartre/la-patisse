import { RecipesController } from 'controllers/recipes-controller';
import { ShortRecipe } from 'custom-types/recipe-types';
import { MetadataRoute } from 'next';

const formatDate = (date: string) => {
    // get normal date from timestamp
    var d = new Date(Number(date)),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export async function generateSitemaps() {
    const recipes = await new RecipesController().index();
    const ids = recipes.map((r: ShortRecipe) => {
        return { id: r._id.toString() };
    });

    // Fetch the total number of products and calculate the number of sitemaps needed
    return ids;
}

export default async function sitemap({
    id,
}: {
    id: string;
}): Promise<MetadataRoute.Sitemap> {
    const recipes = await new RecipesController().index();

    return recipes.map((r: any) => ({
        url: `https://la-patisse.herokuapp.com/recettes/` + id,
        lastModified: formatDate(r.timestamp),
    }));
}
