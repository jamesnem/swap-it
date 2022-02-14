const express = require("express");
const router = express.Router();

const itemService= require("../services/items");

router.delete('/:id', (req, res) => {
    itemService.deleteItem(req.params.id, res);
});
module.exports = router;