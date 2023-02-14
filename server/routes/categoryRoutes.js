const express = require('express');
const router = express.Router();
const fs = require('fs');

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

//GET endpoint for inventory categories
router.get('/', (req, res) => {
    const inventories = readInventory();
    const categorySet = new Set(inventories.map(item => item.category));
    const category = Array.from(categorySet);

    res.send(category);
})

module.exports = router;