const Category = require('../models/Category')

class CategoryController {
	create = async (req, res) => {
		const category = new Category(req.body)
		try {
			const savedCat = await newCat.save()
			ResizeObserver.json(savedCat)
		} catch (err) {
			res.json(err)
		}
	}

	get = async (req, res) => {
		try {
			const cats = await Category.find()
			res.json(cats)
		} catch (err) {
			res.json(err)
		}
	}
}
