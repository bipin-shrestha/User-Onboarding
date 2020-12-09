import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {
    const [ formState, setFormState ] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const [ serverError, setServerError ] = useState("");

    const [ buttonDisabled, setButtonDisabled ] = useState(true);

    const [ data , setData ] = useState([]);

    const [ usersData ] = useState([]);

    const [ errors, setErrors ] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const validation = (event) =>{
        yup
        .reach(formSchema, event.target.name)
        .validate(
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        )
        .then((valid)=>{ 
            setErrors({ ...errors, [event.target.name] : '' });
        })
        .catch((err) => {
            console.log('err', err);
            setErrors({ ...errors, [event.target.name]: err.errors[0] });
        });    
    };

    const changeInput =(event) => {
        event.persist();
        const newFormState ={...formState, [event.target.name]:event.target.type === 'checkbox' ? event.target.checked : event.target.value };
        validation(event);
        setFormState(newFormState);
    };
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Please Enter the Name."),
        email: yup.string().email(),
        password: yup.string().required('Please Enter Password'),
        terms: yup.boolean().oneOf([true],'Please accept our terms and condition.')
    });
    
    useEffect(()=>{
        formSchema.isValid(formState).then((valid) =>{
            console.log("Is this form valid?", valid);
            setButtonDisabled(!valid);
        })
    },[formState]); 

    const formSubmit =(event) =>{
        event.preventDefault();
        axios
        .post('https://reqres.in/api/users' , formState )
        .then((response) =>{
            setData(response.data);
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: false
            });
            usersData.push(response.data);
        })     
        .catch((error) => {
            console.log(error);
        });
    };

     return(
        <form onSubmit={formSubmit}>
        <label htmlFor='name'>
            Name : 
            <input 
                id='name'
                type='text'
                name='name'
                value={formState.name}
                onChange ={changeInput}
                />
                {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
        </label>
        <label htmlFor='email'>
            Email :  
            <input 
                id='email'
                type='text'
                name='email'
                value={formState.email}
                onChange = {changeInput}
                />
                {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
        </label>
        <label htmlFor='password'>
            Password : 
            <input
                id='password'
                type='password'
                name='password'
                value={formState.password}
                onChange ={changeInput}
                />
                {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
        </label>
        <label htmlFor='terms'>
            Terms  
            <input
                id='terms'
                type='checkbox'
                name='terms'
                value={formState.terms}
                onChange ={changeInput}
            />
            {errors.terms.length > 0 ? <p className='error'>{errors.terms}</p> : null}
        </label>
            <button type='submit' disabled={buttonDisabled}>Submit</button>
            {JSON.stringify(usersData, null, 2)}
        </form>
    )
}