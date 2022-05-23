const router = require('express').Router();
const { Category, Product } = require('../../models');

// THE `/api/categories` ENDPOINT

router.get('/', (req, res) => {
// FIND AND RETURN ALL CATEGORIES WITH ASSOCIATE PRODUCTS
  Category.findAll({
    // INCLUDE PRODUCTS
    include: [
      {
        model: Product
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
// FIND ONE AND RETURN CATEGORY BY ITS 'ID' VALUE WITH ASSOCIATED PRODUCTS
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]     
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
  }
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
//CREATE A NEW CATEGORY
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
//UPDATE A CATEGORY BY ITS `ID` VALUE
  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(categoryData => {
    if (!categoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
//DELETE A CATEGORY BY ITS `ID` VALUE
Category.destroy({
  where: {
    id: req.params.id
  }
})
.then(categoryData => {
  if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
  }
  res.json(categoryData);
  })
  .catch(err => {
  console.log(err);
  res.status(500).json(err);
});

});

module.exports = router;