const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');

//Function to read inventory data
function readInventory() {
    try {
        const inventoryFile = fs.readFileSync('./data/inventories.json');
        const inventoryData = JSON.parse(inventoryFile); 
        return inventoryData;
    } catch (error) {
        console.log('Error reading inventory data: ', error.message);
    }
}

//Function to write inventory data
function writeInventory(data) {
    fs.writeFileSync('./data/inventories.json', JSON.stringify(data));
}

//GET endpoint for all inventories
router.get('/', (req, res) => {
    const inventories = readInventory();
    res.send(inventories);
})

//GET endpoint for inventory by ID
router.get('/:id', (req, res) => {
    const inventories = readInventory();

    //Destructure ID from req.params object (req.params.id)
    const { id } = req.params;

    //Find item from inventories data
    const item = inventories.find(inventory => inventory.id === id);

    //Send response/item
    res.send(item);
})

//POST endpoint to add an item
router.post('/add', (req, res) => {
    const inventories = readInventory();

    //New object, populated by request sent
    const newItem = {
        id: uniqid(),
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName, 
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category, 
        status: req.body.status,
        quantity: req.body.quantity
    }

    //Push new inventory object into inventories data
    inventories.push(newItem);

    //Write the new inventory data to inventories file
    writeInventory(inventories);

    //Send response
    res.status(201).json(newItem);
})

//PUT endpoint to edit an item
router.put('/edit/:id', (req, res) => {
    const inventories = readInventory();

    //Find single item
    const item = inventories.find(item => item.id === req.params.id);
    if (!item) {
        res.status(404).send('No item found with that ID.');
    }

    //Find index of item in inventories file
    const index = inventories.indexOf(item);
    if (index === -1) {
        res.status(404).send('No item found to edit.');
    }

    // Create editedItem object
    const editedItem = {
        id: item.id,
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity
    }

    //Splice inventories array with .splice(index, 1, editedItem)
    inventories.splice(index, 1, editedItem);

    //Write the new inventories data to inventories file
    writeInventory(inventories);

    //Send response
    res.status(201).json(editedItem);
})

module.exports = router;