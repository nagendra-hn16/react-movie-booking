import { useState } from 'react'

export function useFormValidation(validations, initialValues = {}) { 
    const [values, setValues] = useState(initialValues);
    const [errorMsgs, setErrorMsgs] = useState({})

    if (!validations) {
        throw new Error('the option `validations` is required');
    }

    if (typeof validations !== 'object') {
        throw new Error('the option `validations` should be an object');
    }

    const validate = (name, value) => {
        const rules = validations[name];
        let errorMsg = '';
        if(!rules) {
            return ''
        } else {
            if(rules.required) {
                if(value.trim() === '') {
                    errorMsg = (typeof rules.required === 'string'
                        ? rules.required
                        : 'This field is mandatory')
                }
            }
            if(rules.pattern  && errorMsg === '') {
                if(!new RegExp(rules.pattern.value).test(value)) {
                    errorMsg = (typeof rules.pattern.message === 'string')
                        ? rules.pattern.message
                        : 'This entry is invalid'
                }
            }
            setErrorMsgs(prevState => ({
                ...prevState,
                [name]: errorMsg
            }));
            
            return errorMsg;
        }
        
    }

    const bind = (name) => {
        if(!name) {
            throw new Error('The field name parameter is required');
        }
        if (name && typeof name !== 'string') {
            throw new Error('The field name should be a string');
        }
        return {
            value: values[name],
            onChange: ev => {
                const value = ev.target.value;
                setValues(prevState => ({
                    ...prevState,
                    [name]: value
                }));
                validate(name, value);
            }
        }
    }

    const isFormValid = () => {
        const hasErrors = Object.keys(validations).some(name =>
            Boolean(validate(name, values[name]))
        );
        return !hasErrors;
    }

    // const validateForm = () => {
    //     let hasError = false
        
    //     for(const name of Object.keys(validations)) {
    //         setValues(prevState => ({
    //             ...prevState,
    //             [name]: values[name]
    //         }));
    //         setErrorMsgs(prevState => ({
    //             ...prevState,
    //             [name]: validate(name, values[name])
    //         }));
    //         if (!hasError && errorMsgs[name] !== '') {
    //             console.log(errorMsgs)
    //             hasError = true;
    //         }
    //     }
    //     return !hasError;
    // }

    return {values, errorMsgs, bind, isFormValid}
}
