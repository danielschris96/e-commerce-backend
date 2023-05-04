const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({ include: Product });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, { include: Product });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const data = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No category with this id.' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category with this id.' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
