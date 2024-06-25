import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography, message, Spin } from 'antd';
import { doCreateUserWithEmailAndPassword } from '../auth';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
 
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const handleSignup = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      await doCreateUserWithEmailAndPassword(values.email, values.password);
      message.success('Signup successful!');
      navigate('/'); 
    } catch (error) {
      message.error(`Signup failed: ${error.message}`);
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="formContainer">
      <Title level={2}>Signup</Title>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
       
          <Form>
            <div className="formItem">
              <label htmlFor="name">Name</label>
              <Field as={Input} name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="formItem">
              <label htmlFor="email">Email</label>
              <Field as={Input} name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="formItem">
              <label htmlFor="password">Password</label>
              <Field as={Input.Password} name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="formItem">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field as={Input.Password} name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            <Button type="primary" htmlType="submit" disabled={isLoading} >
            {isLoading ? <Spin /> : 'SignUp'}
            </Button>
          </Form>
      </Formik>
    </div>
  );
};

export default Signup;
