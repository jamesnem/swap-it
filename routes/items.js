const { Router } = require("express");
const router = Router();

const itemService= require("../services/items");
router.get("/", function (req, res) {
    itemService.getItemCollection(req.query.keyword, res);
});
router.post("/", function (req, res) {
    itemService.postItem(req.body, res);
});

router.put("/", function (req, res) {
    itemService.postItem(req.body, res);
});

router.delete('/:id', (req, res) => {
    itemService.deleteItem(req.params.id, res);
});

module.exports = router;