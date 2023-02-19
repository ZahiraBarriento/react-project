import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LEVELS } from '../../../models/Levels';
import { Task } from '../../../models/classes/Task';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ add, length }) => {

    function addTask(values){
        const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
        );

        add(newTask);
    }

    const initialValues = {
        name: '',
        description: '',
        level: LEVELS.Normal
    }

    const taskSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(6, 'Name too short')
                .required('Name is required'),
            description: Yup.string()
                .min(6, 'Description too short')
                .required('Description is required'),
            level: Yup.string()
                .oneOf([LEVELS.Normal, LEVELS.Urgent, LEVELS.Blocking], 'You must select a level: Normal / Urgent / Blocking')
                .required('Level is required'),
        }
    )

    return (
        <div className='form-outline flex-fill'>
            <h4>Add task</h4>
            <Formik
                initialValues= { initialValues }
                validationSchema= { taskSchema }
                onSubmit={async (values) => {
                    addTask(values);
                    console.log(JSON.stringify(values, null, 2));
                }}
            >
            {
                ({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur
                }) => (
                    <Form className='d-flex justify-content-center align-items-center mb-4'>
                        <Field id="name" type="text" name="name" placeholder="Task name"></Field>
                        {
                            errors.name && touched.name && (
                                <ErrorMessage name='name' component='div'></ErrorMessage>
                            )
                        }

                        <Field id="description" type="text" name="description" placeholder="Task description"></Field>
                        {
                            errors.description && touched.description && (
                                <ErrorMessage name='description' component='div'></ErrorMessage>
                            )
                        }

                        <Field as="select" name="level">
                            <option value={ LEVELS.Normal }>Normal</option>
                            <option value={ LEVELS.Urgent }>Urgent</option>
                            <option value={ LEVELS.Blocking }>Blocking</option>
                        </Field>
                        {
                            errors.level && touched.level && (
                                <ErrorMessage name='level' component='div'></ErrorMessage>
                            )
                        }
                        <button type="submit" className='btn btn-success btn-lg ms-3'>{ length > 0 ? 'Add new task' : 'Create your first task'}</button>
                        {isSubmitting ? (<p>Sending your task...</p>): null}
                    </Form>
                )
            }
            </Formik>
        </div>
    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default TaskForm;
