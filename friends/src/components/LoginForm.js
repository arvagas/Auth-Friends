import React from 'react'
import { Field, withFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { Form, Button } from 'semantic-ui-react'
import { SemanticFormikField } from '../utils/SemanticFormikField'

function JSXForm({ handleSubmit }) {

    return (
        <Form onSubmit={handleSubmit}>
            <Field type='text' name='username' placeholder='Username' label='Username:' component={SemanticFormikField}/>

            <Field type='password' name='password' placeholder='Password' label='Password:' component={SemanticFormikField}/>

            <Button type='submit'>Log In</Button>
        </Form>
    )
}

const LoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || '',
            password: password || ''
        }
    },

    validationSchema: yup.object().shape({
        username: yup
            .string()
            .required('*Username is required'),
        password: yup
            .string()
            .required('*Password is required'),
    }),

    handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
        if (values.username !== 'admin') setErrors({username: '*User does not exist'})
        else if (values.password !== 'password') setErrors({password: '*Incorrect password'})
        else {
            axios
            .post('http://localhost:5000/api/login', values)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                resetForm()
                setSubmitting(false)
                props.history.push('/')
            })
            .catch(err => {
                setSubmitting(false)
            })
        }
    }
})(JSXForm)

export default LoginForm