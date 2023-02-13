import './EditWarehouseForm.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import error from '../../assets/icons/error.svg';
import axios from 'axios';

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
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Loops over formValues obj for validation
        Object.entries(formValues).forEach(([name, value]) => {
            if (!value) {
                setFormError(
                    <div className='edit-warehouse-form__input--error edit-warehouse-form__input--no-error'>
                        <img className='edit-warehouse-form__error-icon' src={error} alt='error icon'></img>
                        <p className='edit-warehouse-form__error-text'>This field is required</p>
                    </div>
                );
            }
        })

        try {
            await axios.put(`http://localhost:4000/warehouse/edit/${id}`, {
                id,
                name: event.target.name.value,
                address: event.target.address.value,
                city: event.target.city.value,
                country: event.target.country.value,
                contactName: event.target.contactName.value,
                position: event.target.position.value,
                phone: event.target.phone.value,
                email: event.target.email.value
            })
            history.push(`/warehouse/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
    }
     
    return (
        <>
            <form className='edit-warehouse-form' onSubmit={handleSubmit}>
                <div className='edit-warehouse-form__warehouse-details-container'>
                    <h2 className='edit-warehouse-form__header'>Warehouse Details</h2>    
                    {/* Name Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='name'>Warehouse Name</label>
                    <input className='edit-warehouse-form__input' type='text' name='name' id='name' onChange={handleChange} value={formValues.name}></input>
                    {!formValues.name && formError}
                    {/* Address Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='address'>Street Address</label>
                    <input className='edit-warehouse-form__input' type='text' name='address' id='address' onChange={handleChange} value={formValues.address}></input>
                    {!formValues.address && formError}
                    {/* City Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='city'>City</label>
                    <input className='edit-warehouse-form__input' type='text' name='city' id='city' onChange={handleChange} value={formValues.city}></input>
                    {!formValues.city && formError}
                    {/* Country Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='country'>Country</label>
                    <input className='edit-warehouse-form__input' type='text' name='country' id='country' onChange={handleChange} value={formValues.country}></input>
                    {!formValues.country && formError}
                </div>
                <div className='edit-warehouse-form__contact-details-container'>
                    <h2 className='edit-warehouse-form__header'>Contact Details</h2>       
                    {/* Contact Name Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='contactName'>Contact Name</label>
                    <input className='edit-warehouse-form__input' type='text' name='contactName' id='contactName' onChange={handleChange} value={formValues.contactName}></input>
                    {!formValues.contactName && formError}
                    {/* Position Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='position'>Position</label>
                    <input className='edit-warehouse-form__input' type='text' name='position' id='position' onChange={handleChange} value={formValues.position}></input>
                    {!formValues.position && formError}
                    {/* Phone Number Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='phone'>Phone Number</label>
                    <input className='edit-warehouse-form__input' type='tel' name='phone' id='phone' onChange={handleChange} value={formValues.phone}></input>
                    {!formValues.phone && formError}
                    {/* Email Label/Input */}
                    <label className='edit-warehouse-form__label' htmlFor='email'>Email</label>
                    <input className='edit-warehouse-form__input' type='email' name='email' id='email' onChange={handleChange} value={formValues.email}></input>
                    {!formValues.email && formError}
                </div>
                <div className='edit-warehouse-form__button-container'>
                    <button className='edit-warehouse-form__cancel-button'>Cancel</button>
                    <button className='edit-warehouse-form__save-button' type='submit'>Save</button>
                </div>
            </form>
        </>
    )
}

export default EditWarehouseForm;