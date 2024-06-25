import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input, Typography, message, Spin } from 'antd';
import { doPasswordChange } from '../auth';
import * as Yup from 'yup';

const { Title } = Typography;

const PasswordChangeSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});
 
const PasswordChange = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      await doPasswordChange(values.email, values.oldPassword, values.newPassword);
      message.success('Password changed successfully!');
      resetForm();
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="formContainer">
      <Title level={2}>Change Password</Title>
      <Formik
        initialValues={{ email: '', oldPassword: '', newPassword: '' }}
        validationSchema={PasswordChangeSchema}
        onSubmit={handlePasswordChange}
      >
        <Form>
          <div className="formItem">
            <label htmlFor="email">Email</label>
            <Field as={Input} name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="formItem">
            <label htmlFor="oldPassword">Old Password</label>
            <Field as={Input.Password} name="oldPassword" />
            <ErrorMessage name="oldPassword" component="div" className="error" />
          </div>
          <div className="formItem">
            <label htmlFor="newPassword">New Password</label>
            <Field as={Input.Password} name="newPassword" />
            <ErrorMessage name="newPassword" component="div" className="error" />
          </div>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? <Spin /> : 'Change Password'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordChange;
