const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// THE `/api/products` ENDPOINT

// GET ALL PRODUCTS
router.get('/', (req, res) => {
  // FIND ALL PRODUCTS WITH ASSOCIATED | INCLUDE CATEGORY AND TAG DATA
  Product.findAll({
    include: [
      {
        model: Category
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
        as: 'productTag_tag'
      }
    ]
  })
  .then(productData => res.json(productData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

// GET ALL PRODUCTS
router.get('/:id', (req, res) => {
  // FIND A SINGLE PRODUCT BY ITS `ID` | INCLUDE ITS ASSOCIATE CATEGORY AND TAG DATA
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
        as: 'productTag_tag'
      }
    ]
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(productData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// CREATE NEW PRODUCT
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // PRODUCT TAGS | CREATE PAIRINGS TO BULK CREATE IN PRODUCT TAG MODEL. 
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // IF THERE AREN'T PRODUCT TAGS, JUST RESPOND.
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  // UPDATE PRODUCT DATA
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // FIND ALL ASSOCIATED TAGS FROM PRODUCT TAG
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // GET LIST OF CURRENT TAG ID'S
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // CREATE FILTERED LIST OF NEW TAG_ID's
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // FIGURE OUT WHICH ONES TO REMOVE
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // RUN BOTH ACTIONS
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DELETE ONE PRODUCT BY ITS `ID` VALUE (UPDATED)
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if (!productData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(productData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
  });
  
module.exports = router;