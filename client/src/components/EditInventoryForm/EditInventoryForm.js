import './EditInventoryForm.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import error from '../../assets/icons/error.svg';
import axios from 'axios';

function EditInventoryForm({ item, id, categories, warehouses }) {
    const [formValues, setFormValues] = useState(item);
    const [formError, setFormError] = useState(null);
    const [priorQuantityValue, setPriorQuantityValue] = useState(null);
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
    }

    const handleRadioButton = (event) => {
        setPriorQuantityValue(formValues.quantity);
        setFormValues({ 
            ...formValues,
            status: event.target.value,
            quantity: event.target.value === "Out of Stock" ? Number(0) : Number(priorQuantityValue)
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
        const itemQuantity = formValues.quantity; //used to update quantity to type number in put request

        // Loops over formValues obj for validation
        Object.entries(formValues).forEach(([name, value]) => {
            if (!value) {
                setFormError(
                    <div className='edit-inventory-form__input--error'>
                        <img className='edit-inventory-form__error-icon' src={error} alt='error icon'></img>
                        <p className='edit-inventory-form__error-text'>This field is required</p>
                    </div>
                );
            }
        })

        if (formValues.itemName && formValues.description) {
            try {
            await axios.put(`http://localhost:4000/inventory/edit/${id}`, { ...formValues, quantity: parseInt(itemQuantity, 10) })
            history.push(`/inventory/${id}`);
        } catch (error) {
            console.log(error);
        }
        }
    }

    const handleCancel = () => {
        history.push(`/inventory/${id}`);
    }

    return (
        <>
            <form className='edit-inventory-form' onSubmit={handleSubmit}>
                <div className='edit-inventory-form__item-details-container'>
                    <h2 className='edit-inventory-form__header'>Item Details</h2>    
                    {/* Item Name Label/Input */}
                    <label className='edit-inventory-form__label' htmlFor='itemName'>Item Name</label>
                    <input className='edit-inventory-form__input' type='text' name='itemName' id='itemName' onChange={handleChange} value={formValues.itemName}></input>
                    {!formValues.itemName && formError}
                    {/* Item Description Label/Input */}
                    <label className='edit-inventory-form__label' htmlFor='description'>Description</label>
                    <textarea className='edit-inventory-form__input-textarea' type='text' name='description' id='description' onChange={handleChange} value={formValues.description}></textarea>
                    {!formValues.description && formError}
                    {/* Item Category Label/Input */}
                    <label className='edit-inventory-form__label' htmlFor='category'>Category</label>
                    <select className='edit-inventory-form__select' name='category' id='category' onChange={handleChange} value={formValues.category}>
                        {categories.map((category) => { return (<option key={category}>{category}</option>) })}
                    </select>
                </div>
                <div className='edit-inventory-form__item-availability-container'>
                    <h2 className='edit-inventory-form__header'>Item Availability</h2>       
                    {/* In Stock Status Label/Radio Buttons */}
                    <label className='edit-inventory-form__label' htmlFor='status'>Status</label>
                    <div className='edit-inventory-form__radio-button-container'>
                        <div className='edit-inventory-form__instock-option'> 
                            <input className='edit-inventory-form__radio-button' type='radio' name='inStock' id='inStock' onChange={handleRadioButton} value="In Stock" checked={formValues.status === "In Stock"}></input>
                            <label className='edit-inventory-form__label' htmlFor='inStock'>In Stock</label>
                        </div>
                        <div className='edit-inventory-form__outofstock-option'>
                            <input className='edit-inventory-form__radio-button' type='radio' name='outOfStock' id='outOfStock' onChange={handleRadioButton} value="Out of Stock" checked={formValues.status === "Out of Stock"}></input>
                            <label className='edit-inventory-form__label' htmlFor='outOfStock'>Out of stock</label>
                        </div>  
                    </div>
                    {/* Quantity Label/Input */}
                    {(formValues.status === "In Stock") 
                        ? <>
                            <label className='edit-inventory-form__label' htmlFor='quantity'>Quantity</label>
                            <input className='edit-inventory-form__input' type='number' name='quantity' id='quantity' onChange={handleChange} value={formValues.quantity}></input> 
                            {!formValues.quantity && formError}
                          </> 
                        : null}
                    {/* Warehouse Label/Input */}
                    <label className='edit-inventory-form__label' htmlFor='warehouse'>Warehouse</label>
                    <select className='edit-inventory-form__select' name='warehouse' id='warehouse' onChange={handleWarehouseSelect} value={formValues.warehouseName}>
                        {warehouses.map((warehouse) => { return (<option key={warehouse.id}>{warehouse.name}</option>)})}
                    </select>
                </div>
                <div className='edit-inventory-form__button-container'>
                    <button className='edit-inventory-form__cancel-button' type='button' onClick={handleCancel}>Cancel</button>
                    <button className='edit-inventory-form__save-button' type='submit'>Save</button>
                </div>
            </form>
        </>
    )
}

export default EditInventoryForm;