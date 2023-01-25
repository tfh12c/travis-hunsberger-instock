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

//GET endpoint for all warehouses
router.get('/', (req, res) => {
    const warehouses = readWarehouses();
    res.send(warehouses);
})

//GET endpoint for warehouse by ID
router.get('/:id', (req, res) => {
    const warehouses = readWarehouses();

    //Find single warehouse with ID
    const singleWarehouse = warehouses.find(warehouse => warehouse.id === req.params.id);

    //If not a valid warehouse ID, send a 404
    if (!singleWarehouse) {
        return res.status(404).send('No warehouse found with that ID.');
    }
    res.send(singleWarehouse);
})

//POST endpoint to add warehouse
router.post('/add', (req, res) => {
    const warehouses = readWarehouses();

    //New object, populated by request sent 
    const newWarehouse = {
        id: uniqid(),
        name: req.body.name, 
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.name,
            position: req.body.position, 
            phone: req.body.phone,
            email: req.body.email
        }
    }

    //Push new warehouse into warehouses data
    warehouses.push(newWarehouse);

    //Write the new warehouses data to warehouses file
    writeWarehouses(warehouses);

    //Send response
    res.status(201).json(newWarehouse);
})

//PUT endpoint to edit a warehouse
router.put('/edit/:id', (req, res) => {
    const warehouses = readWarehouses();
    
    //Find singleWarehouse
    const singleWarehouse = warehouses.find(warehouse => warehouse.id === req.params.id);
    if (!singleWarehouse) {
        res.status(404).send('No warehouse found with that ID.');
    }

     //Find index of singleWarehouse
    const index = warehouses.indexOf(singleWarehouse);
    if (index === -1) {
        res.status(404).send('No warehouse found to edit.');
    }

     //Create editedWarehouse object
     editedWarehouse = {
        id: singleWarehouse.id, 
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.city,
        contact: {
            name: req.body.contactName,
            position: req.body.contactPosition,
            phone: req.body.contactPhone,
            email: req.body.email
        }
     }

    //Splice warehouses array with .splice(foundIndex, 1, editedWarehouse)
     warehouses.splice(index, 1, editedWarehouse);

     //Write the new warehouses data to warehouses file
     writeWarehouses(warehouses);

     //Send response
    res.status(201).json(editedWarehouse);
})


//DELETE endpoint to delete warehouse
router.delete('/:id/delete', (req, res) => {
    const warehouses = readWarehouses();
    const inventories = readInventory();

    //Find warehouse from ID
    const singleWarehouse = warehouses.find(warehouse => warehouse.id === req.params.id);
    if (!singleWarehouse) {
        res.status(404).send('No warehouse found with that ID.');
    }

    //Find index of warehouse to splice from warehouses
    const index = warehouses.indexOf(singleWarehouse);
    if (index === -1) {
        res.status(404).send('No warehouse found to edit.');
    }

    //Filter inventories to get everything but the found warehouse inventory 
    const newInventory = inventories.filter(inventory => inventory.warehouseID !== singleWarehouse.id)

    //Splice warehouses
    warehouses.splice(index, 1);

    //Write new warehouse data
    writeWarehouses(warehouses);

    //Write new inventory data
    writeInventory(newInventory);

    //Send response
    res.status(201).send(`Deleted ${singleWarehouse.name} warehouse.`);
})

module.exports = router;