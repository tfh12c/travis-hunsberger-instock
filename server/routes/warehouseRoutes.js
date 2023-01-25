const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');

//Function to read warehouse data
function readWarehouses() {
    try {
        const warehousesFile = fs.readFileSync('./data/warehouses.json');
        const warehousesData = JSON.parse(warehousesFile); //returns JSON object to work with
        return warehousesData; 
    } catch (error) {
        console.log('Error reading warehouse data: ', error.message);
    }
}

//Function to write warehouse data
function writeWarehouses(data) {
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(data)); //converts js object into json string when pushing to file
}

//GET endpoint for all warehouses
router.get('/', (req, res) => {
    const warehouses = readWarehouses();
    res.send(warehouses);
})

//GET endpoint for warehouse by ID
router.get('/:id', (req, res) => {
    const warehouses = readWarehouses();
    const singleWarehouse = warehouses.find(warehouse => warehouse.id === req.params.id)
    res.send(singleWarehouse);
})

//POST endpoint to add warehouse
router.post('/add', (req, res) => {
    res.send('This is a post!');
})

//PUT endpoint to edit warehouse

//DELETE endpoint to delete warehouse

module.exports = router;