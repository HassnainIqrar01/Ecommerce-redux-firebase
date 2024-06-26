import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input, Typography, message, Spin } from 'antd';
import { doPasswordReset } from '../auth';  
import * as Yup from 'yup';

const { Title } = Typography;

const PasswordResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const handlePasswordReset = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      await doPasswordReset(values.email);
      message.success('Password reset email sent!');
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
    setIsLoading(false);
    setSubmitting(false);
  };
 
  return (
    <div className="formContainer">
      <Title level={2}>Reset Password</Title>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={PasswordResetSchema}
        onSubmit={handlePasswordReset}
      >
        <Form>
          <div className="formItem">
            <label htmlFor="email">Email</label>
            <Field as={Input} name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? <Spin /> : 'Send Reset Email'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordReset;
