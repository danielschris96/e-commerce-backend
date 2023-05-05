const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


  // find all tags
router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll({ include: Product });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, { include: Product });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // create a new tag
router.post('/', async (req, res) => {
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No tag with this id.' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // delete tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No tag with this id.' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
