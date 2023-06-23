import React from 'react'

//user_name
//email
//password
//confirm_password
//phoneNumber
//date

export default function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.length < 3) {
        errors.name = "Must be 3 characters or more";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8) {
        errors.password = "Must be 8 characters or more";
    }

    if(!values.confirm_password){
        errors.confirm_password = "Required";
    }

    if(values.password !== values.confirm_password){
        errors.confirm_password = "Passwords do not match";
    }


    if(!/^\d+$/.test(values.phoneNumber)){
        errors.phoneNumber = "Enter only numbers"
    }

    if(!values.phoneNumber) {
        errors.phoneNumber = "Required"
    }


    if (!values.date) {
        errors.date = "Required";
    }
    return errors;



}