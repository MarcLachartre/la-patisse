import { ValidatorCheck } from '@validator/validator';
import type { Ingredient } from 'custom-types/recipe-types';

export class CreateRecipeValidator {
    static checkName(name: string) {
        const isValidName = new ValidatorCheck(name);

        isValidName.isEmpty();
        isValidName.maxLength(40);

        return isValidName.validity;
    }

    static checkDescription(description: string) {
        const isValidDescription = new ValidatorCheck(description);

        isValidDescription.isEmpty();
        isValidDescription.maxLength(400);

        return isValidDescription.validity;
    }

    static checkPicture(file: any) {
        const isValidImage = new ValidatorCheck(file, 'une image');

        isValidImage.isEmpty();
        isValidImage.isImage();
        isValidImage.maxImageSize(10); //10Mb;
        isValidImage.maxLength(1);
        return isValidImage.validity;
    }

    static checkQuantity(quantity: string) {
        const isValidQuantity = new ValidatorCheck(quantity);

        isValidQuantity.isEmpty();
        isValidQuantity.numberType();
        isValidQuantity.maxLength(10);

        return isValidQuantity.validity;
    }

    static checkUnit(unit: string) {
        const isValidUnit = new ValidatorCheck(unit);

        isValidUnit.isText();
        isValidUnit.maxLength(15);

        return isValidUnit.validity;
    }

    static checkPrep(prep: string) {
        const isValidPrep = new ValidatorCheck(prep);

        isValidPrep.isText();
        isValidPrep.maxLength(15);

        return isValidPrep.validity;
    }

    static checkType(type: string) {
        const isValidType = new ValidatorCheck(type);

        isValidType.isEmpty();
        isValidType.maxLength(400);

        return isValidType.validity;
    }

    static checkIngredients(ingredientList: Ingredient[], inputName?: string) {
        const isValidIngredients = new ValidatorCheck(
            ingredientList,
            inputName
        );

        isValidIngredients.isEmpty();
        isValidIngredients.maxLength(50);

        return isValidIngredients.validity;
    }

    static checkInstruction(instruction: string, inputName?: string) {
        const isValidInstruction = new ValidatorCheck(instruction, inputName);

        isValidInstruction.isEmpty();
        isValidInstruction.maxLength(700);

        return isValidInstruction.validity;
    }

    static checkInstructionList(instructions: string[], inputName?: string) {
        const isValidInstructionList = new ValidatorCheck(
            instructions,
            inputName
        );

        isValidInstructionList.isEmpty();
        isValidInstructionList.maxLength(50);

        return isValidInstructionList.validity;
    }

    static checkTool(tool: string, inputName?: string) {
        const isValidTool = new ValidatorCheck(tool, inputName);

        isValidTool.isEmpty();
        isValidTool.maxLength(100);

        return isValidTool.validity;
    }

    static checkToolList(tools: string[], inputName?: string) {
        const isValidToolList = new ValidatorCheck(tools, inputName);

        isValidToolList.isEmpty();
        isValidToolList.maxLength(50);

        return isValidToolList.validity;
    }
}
