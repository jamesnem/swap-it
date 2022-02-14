const dbo = require("../db/conn");

let itemCollection;


const getItemCollection = () =>{
    if(itemCollection){
        return itemCollection ;
    }        
    try{
        itemCollection = dbo.getDb().collection("items");
        return itemCollection;
    }catch(e){
        return null;
    }
}

const deleteItem = (id, res) => {
    itemCollection.deleteOne({ itemID: id }, (err, result) => {
        if (err) throw err;
        res.send({ result: 204 });
    });
}

module.exports={
    deleteItem
}