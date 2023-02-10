import './EditWarehouseForm.scss';
import { useState } from 'react';
import error from '../../assets/icons/error.svg';

function EditWarehouseForm({ warehouse, id }) {
    const [formValues, setFormValues] = useState({
        name: warehouse.name,
        address: warehouse.address,
        city: warehouse.city,
        country: warehouse.country,
        contactName: warehouse.contact.name,
        position: warehouse.contact.position,
        phone: warehouse.contact.phone,
        email: warehouse.contact.email
    });
    const [formError, setFormError] = useState(null);

    const handleSubmit = (event) => {
        // event.preventDefault();

        // // maps over formValues for validation
        // Object.entries(formValues).map(([name, value]) => {
        //     // if (!value) {     
        //     //     setFormError(
        //     //         <div className='edit-warehouse-form__input--error edit-warehouse-form__input--no-error'>
        //     //             <img className='edit-warehouse-form__error-icon' src={error} alt='error icon'></img>
        //     //             <p className='edit-warehouse-form__error-text'>This field is required</p>
        //     //         </div>
        //     //     )
        //     // }
        // })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
        console.log(value);
    }
     
    return (
        <>
            <form className='edit-warehouse-form' onSubmit={handleSubmit}>
                <div className='edit-warehouse-form__warehouse-details-container'>
                    <h2 className='edit-warehouse-form__header'>Warehouse Details</h2>    
                    {/* Name Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='name'>Warehouse Name</label>
                    <input className='edit-warehouse-form__input' type='text' name='name' id='name' onChange={handleChange} value={formValues.name}></input>
                    {formError}
                    {/* <div className='edit-warehouse-form__input--error edit-warehouse-form__input--no-error'>
                        <img className='edit-warehouse-form__error-icon' src={error} alt='error icon'></img>
                        <p className='edit-warehouse-form__error-text'>This field is required</p>
                    </div> */}
                    {/* Address Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='address'>Street Address</label>
                    <input className='edit-warehouse-form__input' type='text' name='address' id='address' onChange={handleChange} value={formValues.address}></input>
                    {/* City Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='city'>City</label>
                    <input className='edit-warehouse-form__input' type='text' name='city' id='city' onChange={handleChange} value={formValues.city}></input>
                    {/* Country Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='country'>Country</label>
                    <input className='edit-warehouse-form__input' type='text' name='country' id='country' onChange={handleChange} value={formValues.country}></input>
                </div>
                <div className='edit-warehouse-form__contact-details-container'>
                    <h2 className='edit-warehouse-form__header'>Contact Details</h2>       
                    {/* Contact Name Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='contactName'>Contact Name</label>
                    <input className='edit-warehouse-form__input' type='text' name='contactName' id='contactName' onChange={handleChange} value={formValues.contactName}></input>
                    {/* Position Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='position'>Position</label>
                    <input className='edit-warehouse-form__input' type='text' name='position' id='position' onChange={handleChange} value={formValues.position}></input>
                    {/* Phone Number Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='phone'>Phone Number</label>
                    <input className='edit-warehouse-form__input' type='tel' name='phone' id='phone' onChange={handleChange} value={formValues.phone}></input>
                    {/* Email Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='email'>Email</label>
                    <input className='edit-warehouse-form__input' type='email' name='email' id='email' onChange={handleChange} value={formValues.email}></input>
                </div>
                <div className='edit-warehouse-form__button-container'>
                    <button className='edit-warehouse-form__cancel-button' type='submit'>Cancel</button>
                    <button className='edit-warehouse-form__save-button'>Save</button>
                </div>
            </form>
        </>
    )
}

export default EditWarehouseForm;