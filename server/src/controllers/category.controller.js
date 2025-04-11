import { BAD_REQUEST, OK, SERVER_ERROR } from "../constants/errorCodes.js";
import { Category } from "../models/Category.model.js";
import { v4 as uuid } from "uuid";

//find query
const getCategory = async (filterOption) => {
    try {
        return await Category.find({
            $or: [
                { category_id: filterOption },
                { category_name: filterOption },
            ],
        });
    } catch (err) {
        throw err;
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories.length) {
            return res.status(OK).json({
                message: "No categories found",
            });
        }
        return res.status(OK).json(categories);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while getting categories",
        });
    }
};

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const [existingCategory] = await getCategory(categoryName);
        if (existingCategory) {
            return res.status(BAD_REQUEST).json({
                message: "category already exists",
            });
        }
        const category = await Category.create({
            category_id: uuid(),
            category_name: categoryName,
        });
        return res.status(OK).json(category);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while adding the category",
        });
    }
};

const removeCategory = async (req, res) => {
    try {
        const { filterOption } = req.body;
        const [category] = await getCategory(filterOption);
        if (!category) {
            return res.status(BAD_REQUEST).json({
                message: "category not found",
            });
        }
        await Category.deleteOne({
            $or: [
                { category_id: filterOption },
                { category_name: filterOption },
            ],
        });

        return res.status(OK).json({
            message: "category removed successfully",
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err,
            message: "something went wrong while removing the category",
        });
    }
};

export { addCategory, removeCategory, getCategories };
