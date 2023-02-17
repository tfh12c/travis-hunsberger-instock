import './EditInventoryForm.scss';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import error from '../../assets/icons/error.svg';
import axios from 'axios';

function EditInventoryForm({ item, categories, warehouses }) {
    const [formValues, setFormValues] = useState(item);
    const [formError, setFormError] = useState(null);
    const history = useHistory();

    //Trim down warehouses prop to just warehouse name and ID
    const warehouseList = warehouses.map(warehouse => {
        const container = {};
        container.id = warehouse.id;
        container.name = warehouse.name
        return container;
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
    }

    const handleRadioButton = (event) => {
        setFormValues({ 
            ...formValues,
            status: event.target.value,
            quantity: event.target.value === "Out of Stock" ? Number(0) : formValues.quantity
         });
    }

    useEffect(() => {
        console.log(formValues);
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Loops over formValues obj for validation
        Object.entries(formValues).forEach(([name, value]) => {
            if (!value) {
                setFormError(
                    <div className='edit-inventory-form__input--error edit-inventory-form__input--no-error'>
                        <img className='edit-inventory-form__error-icon' src={error} alt='error icon'></img>
                        <p className='edit-inventory-form__error-text'>This field is required</p>
                    </div>
                );
            }
        })

        // try {
        //     await axios.put(`http://localhost:4000/warehouse/edit/${id}`, {
        //         id,
        //         name: event.target.name.value,
        //         address: event.target.address.value,
        //         city: event.target.city.value,
        //         country: event.target.country.value,
        //         contactName: event.target.contactName.value,
        //         position: event.target.position.value,
        //         phone: event.target.phone.value,
        //         email: event.target.email.value
        //     })
        //     history.push(`/warehouse/${id}`);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <>
            <form className='edit-inventory-form' onSubmit={handleSubmit}>
                <div className='edit-inventory-form__item-details-container'>
                    <h2 className='edit-inventory-form__header'>Item Details</h2>    
                    {/* Item Name Label/Input */}
                    <label 
                        className='edit-inventory-form__label' 
                        htmlFor='itemName'>Item Name</label>
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
                            <input className='edit-inventory-form__input' type='number' name='quantity' id='quantity' onChange={handleChange} value={formValues.quantity} onFocus={(event) => event.target.value = ""}></input> 
                            {!formValues.quantity && formError}
                          </> 
                        : null}
                    {/* Warehouse Label/Input */}
                    <label className='edit-inventory-form__label' htmlFor='warehouse'>Warehouse</label>
                    <select className='edit-inventory-form__select' name='warehouse' id='warehouse' onChange={handleChange} value={formValues.warehouseName}>
                        {warehouseList.map((warehouse) => { return (<option key={warehouse.id}>{warehouse.name}</option>)})}
                    </select>
                </div>
                <div className='edit-inventory-form__button-container'>
                    <button className='edit-inventory-form__cancel-button'>Cancel</button>
                    <button className='edit-inventory-form__save-button' type='submit'>Save</button>
                </div>
            </form>
        </>
    )
}

export default EditInventoryForm;