// IMPORT MODELS
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// PRODUCTS BELONGS TO CATEGORY | CATEGORIES HAVE MANY PRODUCTS
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})
Category.hasMany(Product, {
  foreignKey: 'category_id'
})

// PRODUCTS BEONG TO MANY TAGS (THROUGH PRODUCT TAGS)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'productTag_tag',
  foreignKey: 'product_id'
})

// TAGS BELONG TO MANY PRODUCTS (THROUGH PRODUCT TAGS)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'productTag_product',
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};