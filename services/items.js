const ItemModel = require("../models/item_model");

const getItemCollection = (keyword, res) =>{
    let query = {}
    // to filter items by keyword
    if(keyword){
        query['title'] = new RegExp(keyword);
    }
    ItemModel.find(query,function (err, result) {
        if (err) throw err
        res.send(result)
    });
}

const postItem = (item, res) => {
    //add some validation logic
    console.log(JSON.stringify(item));
    if(item){
        const itemModel = ItemModel(item);
        itemModel.save();
    }else{
        res.sendStatus(500);
    }
    res.sendStatus(204);
}

const putItem = (item, res) => {
    //add some validation logic
    console.log(JSON.stringify(item));
    if(item){
        ItemModel.findOne({_id:item._id},(err, result) => {
            if(err) res.sendStatus(500);
            result.title = item.title;
            result.info = item.info;
            result.save();
        })
    }else{
        res.sendStatus(500);
    }
    res.sendStatus(204);
}

const deleteItem = (id, res) => {
    ItemModel.remove({_id:id},(err) => {
        if (err) throw err;
        res.send({ result: 204 });
    })
}

module.exports={
    getItemCollection,
    postItem,
    putItem,
    deleteItem
}