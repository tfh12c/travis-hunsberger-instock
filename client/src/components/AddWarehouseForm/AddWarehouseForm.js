import './AddWarehouseForm.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import uniqid from 'uniqid';
import error from '../../assets/icons/error.svg';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function AddWarehouseForm() {
    const [formValues, setFormValues] = useState({
        id: uniqid(),
        name: '',
        address: '',
        city: '',
        country: '',
        contactName: '',
        position: '',
        phone: '',
        email: ''
    });
    const [formError, setFormError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Loops over formValues obj for validation
        Object.entries(formValues).forEach(([name, value]) => {
            if (!value) {
                setFormError(
                    <div className='add-warehouse-form__input--error'>
                        <img className='add-warehouse-form__error-icon' src={error} alt='error icon'></img>
                        <p className='add-warehouse-form__error-text'>This field is required</p>
                    </div>
                );
            }
        })

        if (formValues.name && formValues.address && formValues.city && formValues.country && formValues.contactName && formValues.position && formValues.phone && formValues.email) {
            try {
                await axios.post(`${API_ENDPOINT}/warehouse/add`, { ...formValues })
                history.push(`/warehouse`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // [name] = dynamic value
        setFormValues({ ...formValues, [name]: value, });
    }

    const handleCancel = () => {
        history.push('/warehouse');
    }

    return (
        <>
            <form className='add-warehouse-form' onSubmit={handleSubmit}>
                <div className='edit-warehouse-form__input-section'>
                    <div className='add-warehouse-form__warehouse-details-container'>
                        <h2 className='add-warehouse-form__header'>Warehouse Details</h2>    
                        {/* Name Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='name'>Warehouse Name</label>
                        <input className='add-warehouse-form__input' type='text' name='name' id='name' onChange={handleChange} value={formValues.name} placeholder='Warehouse Name'></input>
                        {!formValues.name && formError}
                        {/* Address Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='address'>Street Address</label>
                        <input className='add-warehouse-form__input' type='text' name='address' id='address' onChange={handleChange} value={formValues.address} placeholder='Street Address'></input>
                        {!formValues.address && formError}
                        {/* City Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='city'>City</label>
                        <input className='add-warehouse-form__input' type='text' name='city' id='city' onChange={handleChange} value={formValues.city} placeholder='City'></input>
                        {!formValues.city && formError}
                        {/* Country Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='country'>Country</label>
                        <input className='add-warehouse-form__input' type='text' name='country' id='country' onChange={handleChange} value={formValues.country} placeholder='Country'></input>
                        {!formValues.country && formError}
                    </div>
                    <div className='add-warehouse-form__contact-details-container'>
                        <h2 className='add-warehouse-form__header'>Contact Details</h2>       
                        {/* Contact Name Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='contactName'>Contact Name</label>
                        <input className='add-warehouse-form__input' type='text' name='contactName' id='contactName' onChange={handleChange} value={formValues.contactName} placeholder='Contact Name'></input>
                        {!formValues.contactName && formError}
                        {/* Position Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='position'>Position</label>
                        <input className='add-warehouse-form__input' type='text' name='position' id='position' onChange={handleChange} value={formValues.position} placeholder='Position'></input>
                        {!formValues.position && formError}
                        {/* Phone Number Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='phone'>Phone Number</label>
                        <input className='add-warehouse-form__input' type='tel' name='phone' id='phone' onChange={handleChange} value={formValues.phone} placeholder='Phone Number'></input>
                        {!formValues.phone && formError}
                        {/* Email Label/Input */}
                        <label className='add-warehouse-form__label' htmlFor='email'>Email</label>
                        <input className='add-warehouse-form__input' type='email' name='email' id='email' onChange={handleChange} value={formValues.email} placeholder='Email'></input>
                        {!formValues.email && formError}
                    </div>
                </div>
                <div className='add-warehouse-form__button-container'>
                    <button className='add-warehouse-form__cancel-button' type='button' onClick={handleCancel}>Cancel</button>
                    <button className='add-warehouse-form__save-button' type='submit'>+ Add Warehouse</button>
                </div>
            </form>
        </>
    )
}

export default AddWarehouseForm;