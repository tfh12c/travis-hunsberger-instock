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

module.exports = router;