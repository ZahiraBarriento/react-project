/**
 * Componente que va a contener un formulario para
 * autenticación de usuarios.
 */
/*
import React, { useState } from 'react';
import PropTypes from 'prop-types';


const LoginForm = () => {

    const initialCredentials = [
        {
            user: '',
            password: ''
        }
    ]

    const [credentials, setCredentials] = useState(initialCredentials);


    return (
        <div>
            
        </div>
    );
};


LoginForm.propTypes = {

};


export default LoginForm;
*/

import React from 'react';
//import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


//** Forma de especificar la esctructura de nuestro formulario 
const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
        password: Yup.string()
                .required('Password is required')
    }
);


const LoginForm = () => {

    /**
     * Compos que obtendra el formulario
     */
    const initialCredentials = {
        email: '',
        password: ''
    }

    //const history = useHistory();

    return (
        <div>
            <h4>Login Formik</h4>
            <Formik
                // *** Valores iniciales que va a tener el formulario
                initialValues = { initialCredentials }

                // *** Yup Validation Schema ***
                validationSchema = { loginSchema }

                // ** Que debe de ejecutarse al enviar el formulario
                onSubmit={ async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    // We save the data in the localstorage
                    await localStorage.setItem('credentials', values);
                    //history.push('/profile');
                }}
            >
                    
                {({ values, // Valores del campo
                    touched, // Saber si el uaurio ha tocado los campos
                    errors, // Para obtener el error de algun campo
                    isSubmitting, // Indica si se ha terminado de enviar o no el formulario
                    handleChange, // Se puede controlar los cambios de un campo
                    handleBlur, // Cambio de foco
                    }) => (
                        <Form>
                            {/* Creación del formulario */}
                            {/* Field se utiliza para definir un campo del formulario, en este caso no se utiliza los input como tal */}
                            <label htmlFor="email">Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" />
                            {/* Email Errors */}
                            {
                                errors.email && touched.email && 
                                (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                placeholder="password"
                                type='password'
                            />
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && 
                                (
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
                                )
                            }

                            <button type="submit">Login</button>

                            {/* Detecta en momento que se termine de enviar el formulario */}
                            {isSubmitting ? (<p>Login your credentials...</p>): null}
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}

export default LoginForm;
