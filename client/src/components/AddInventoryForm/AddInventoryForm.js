import './AddInventoryForm.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import error from '../../assets/icons/error.svg';
import axios from 'axios';
import uniqid from 'uniqid';

function AddInventoryForm({ categories, warehouses }) {
    const [formValues, setFormValues] = useState({
        category: '',
        description: '',
        id: uniqid(),
        itemName: '',
        quantity: '',
        status: 'In Stock',
        warehouseID: '',
        warehouseName: ''
    });
    const [formError, setFormError] = useState(null);
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
    }

    const handleRadioButton = (event) => {
        setFormValues({ 
            ...formValues,
            quantity: Number(event.target.value) 
         });
    }

    const handleWarehouseSelect = (event) => {
        warehouses.forEach(warehouse => {
            (event.target.value === warehouse.name) && setFormValues({
                ...formValues,
                warehouseID: warehouse.id,
                warehouseName: warehouse.name
            });
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const itemQuantity = formValues.quantity; //used to update quantity to type number in post request

        // Loops over formValues obj for validation
        Object.entries(formValues).forEach(([name, value]) => {
            if (!value) {
                setFormError(
                    <div className='add-inventory-form__input--error'>
                        <img className='add-inventory-form__error-icon' src={error} alt='error icon'></img>
                        <p className='add-inventory-form__error-text'>This field is required</p>
                    </div>
                );
            }
        })
        if (formValues.category && formValues.description && formValues.itemName && formValues.quantity && formValues.warehouseID && formValues.warehouseName) {
            const id = formValues.id;
            try {
                await axios.post(`http://localhost:4000/inventory/add`, { ...formValues, quantity: parseInt(itemQuantity, 10) })
                history.push(`/inventory/${id}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const handleCancel = () => {
        history.push('/inventory');
    }

    return (
        <>
            <form className='add-inventory-form' onSubmit={handleSubmit}>
                <div className='add-inventory-form__input-section'>
                    <div className='add-inventory-form__item-details-container'>
                        <h2 className='add-inventory-form__header'>Item Details</h2>    
                        {/* Item Name Label/Input */}
                        <label className='add-inventory-form__label' htmlFor='itemName'>Item Name</label>
                        <input className='add-inventory-form__input' type='text' name='itemName' id='itemName' onChange={handleChange} value={formValues.itemName} placeholder='Item Name'></input>
                        {!formValues.itemName && formError}
                        {/* Item Description Label/Input */}
                        <label className='add-inventory-form__label' htmlFor='description'>Description</label>
                        <textarea className='add-inventory-form__input-textarea' type='text' name='description' id='description' onChange={handleChange} value={formValues.description} placeholder='Please enter a brief item description...'></textarea>
                        {!formValues.description && formError}
                        {/* Item Category Label/Input */}
                        <label className='add-inventory-form__label' htmlFor='category'>Category</label>
                        <select className='add-inventory-form__select' required name='category' id='category' onChange={handleChange} value={formValues.category} placeholder='Please select'>
                            <option value='' disabled='' hidden>Please select</option>
                            {categories.map((category) => { return (<option key={category} value={category}>{category}</option>) })}
                        </select>
                        {!formValues.category && formError}
                    </div>
                    <div className='add-inventory-form__item-availability-container'>
                        <h2 className='add-inventory-form__header'>Item Availability</h2>       
                        {/* In Stock Status Label/Radio Buttons */}
                        <label className='add-inventory-form__label' htmlFor='status'>Status</label>
                        <div className='add-inventory-form__radio-button-container'>
                            <div className='add-inventory-form__instock-option'> 
                                <input className='add-inventory-form__radio-button' type='radio' name='inStock' id='inStock' onChange={handleRadioButton} value="In Stock" checked></input>
                                <label className='add-inventory-form__label--status' htmlFor='inStock'>In Stock</label>
                            </div>
                            <div className='add-inventory-form__outofstock-option'>
                                <input className='add-inventory-form__radio-button' disabled type='radio' name='outOfStock' id='outOfStock' onChange={handleRadioButton} value="Out of Stock" checked={formValues.status === "Out of Stock"}></input>
                                <label className='add-inventory-form__label--status' htmlFor='outOfStock'>Out of stock</label>
                            </div>  
                        </div>
                        {/* Quantity Label/Input */}
                        {(formValues.status === "In Stock") 
                            ? <>
                                <label className='add-inventory-form__label' htmlFor='quantity'>Quantity</label>
                                <input className='add-inventory-form__input' type='number' name='quantity' id='quantity' onChange={handleChange} value={formValues.quantity} placeholder='0'></input> 
                                {!formValues.quantity && formError}
                            </> 
                            : null}
                        {/* Warehouse Label/Input */}
                        <label className='add-inventory-form__label' htmlFor='warehouse'>Warehouse</label>
                        <select className='add-inventory-form__select' required name='warehouse' id='warehouse' onChange={handleWarehouseSelect} value={formValues.warehouseName} placeholder='Please select'>
                        <option value='' disabled='' hidden>Please select</option>
                            {warehouses.map((warehouse) => { return (<option key={warehouse.id}>{warehouse.name}</option>)})}
                        </select>
                        {!formValues.warehouseName && formError}
                    </div>
                </div>
                <div className='add-inventory-form__button-container'>
                    <button className='add-inventory-form__cancel-button' type='button' onClick={handleCancel}>Cancel</button>
                    <button className='add-inventory-form__save-button' type='submit' formNoValidate>Save</button>
                </div>
            </form>
        </>
    )
}

export default AddInventoryForm;