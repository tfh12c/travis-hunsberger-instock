import './EditWarehouseForm.scss';
import { useState } from 'react';

function EditWarehouseForm({ warehouse }) {
    const initialFormValues = {
        name: warehouse.name,
        address: warehouse.address,
        city: warehouse.city,
        country: warehouse.country,
        contactName: warehouse.contact.name,
        position: warehouse.contact.position,
        phone: warehouse.contact.phone,
        email: warehouse.contact.email,
    }

    const [formValues, setFormValues] = useState(initialFormValues);

    console.log(formValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value,})
    }

    return (
        <form className='edit-warehouse-page__warehouse-form'>
            {/* Name Label/Input */}
            <label className='edit-warehouse-page__warehouse-name-label' htmlFor='name'>Warehouse Name</label>
            <input className='edit-warehouse-page__warehouse-name-input' type='text' name='name' id='name' onChange={handleChange} value={formValues.name}></input>
            {/* Address Label/Input */}
            <label className='edit-warehouse-page__warehouse-address-label' htmlFor='address'>Street Address</label>
            <input className='edit-warehouse-page__warehouse-address-input' type='text' name='address' id='address' onChange={handleChange} value={formValues.address}></input>
            {/* City Label/Input */}
            <label className='edit-warehouse-page__warehouse-city-label' htmlFor='city'>City</label>
            <input className='edit-warehouse-page__warehouse-city-input' type='text' name='city' id='city' onChange={handleChange} value={formValues.city}></input>
            {/* Country Label/Input */}
            <label className='edit-warehouse-page__warehouse-country-label' htmlFor='country'>Country</label>
            <input className='edit-warehouse-page__warehouse-country-input' type='text' name='country' id='country' onChange={handleChange} value={formValues.country}></input>
            {/* Contact Name Label/Input */}
            <label className='edit-warehouse-page__warehouse-contact-name-label' htmlFor='contactName'>Contact Name</label>
            <input className='edit-warehouse-page__warehouse-contact-name-input' type='text' name='contactName' id='contactName' onChange={handleChange} value={formValues.contactName}></input>
            {/* Position Label/Input */}
            <label className='edit-warehouse-page__warehouse-position-label' htmlFor='position'>Position</label>
            <input className='edit-warehouse-page__warehouse-position-input' type='text' name='position' id='position' onChange={handleChange} value={formValues.position}></input>
            {/* Phone Number Label/Input */}
            <label className='edit-warehouse-page__warehouse-phone-number-label' htmlFor='phone'>Phone Number</label>
            <input className='edit-warehouse-page__warehouse-phone-number-input' type='tel' name='phone' id='phone' onChange={handleChange} value={formValues.phone}></input>
            {/* Email Label/Input */}
            <label className='edit-warehouse-page__warehouse-email-label' htmlFor='email'>Email</label>
            <input className='edit-warehouse-page__warehouse-email-input' type='email' name='email' id='email' onChange={handleChange} value={formValues.email}></input>
        </form>
    )
}

export default EditWarehouseForm;