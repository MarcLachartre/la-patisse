import { RecipesController } from 'controllers/recipes-controller';
import { ShortRecipe } from 'custom-types/recipe-types';
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
    const recipes = await new RecipesController().index();
    const ids = recipes.map((r: ShortRecipe) => {
        return { id: r._id };
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

    return recipes.map((r: any) => ({
        url: `https://www.la-patisse.com/recettes/${r.name
            .split(' ')
            .map((word: string) => {
                return word[0].toLowerCase() + word.substring(1);
            })
            .join('_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()}`,
        lastModified: formatDate(r.timestamp),
    }));
}
