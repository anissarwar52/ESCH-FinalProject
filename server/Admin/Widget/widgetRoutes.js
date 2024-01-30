const express = require('express');
const router = express.Router();
const Products = require('../../Admin/model/Products/productSchema');
const SoleUsers = require('../../Admin/model/SoleDistributor/soleSchema');
const soleSchema = require('../../SoleDistributor/model/soleLogin/soleSchema')

router.get('/', async (req, res) => {
  try {
    const productCount = await Products.countDocuments({});
    res.json({ count: productCount });
  } catch (error) {
    res.status(500).json({ message: "Can't find product count", error });
  }
});

router.get('/', async (req, res) => {
  try {
    const [soleUsersCount, soleSchemaCount] = await Promise.all([
      SoleUsers.countDocuments({}),
      soleSchema.countDocuments({}),
    ]);

    const totalSoleCount = soleUsersCount + soleSchemaCount;
    res.json({ count: totalSoleCount });
  } catch (error) {
    res.status(500).json({ message: "Can't find sole distributor count", error });
  }
});

module.exports = router;
