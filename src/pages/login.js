import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input, Typography, message, Spin } from 'antd';
import { doSignInWithEmailAndPassword } from '../auth';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setUser} from '../components/redux/actions/userActions';
import { loadCartFromFirebase } from '../components/redux/actions/cartActions';
import * as Yup from 'yup';

const {Title} = Typography;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const userCredential = await doSignInWithEmailAndPassword(values.email, values.password);
      const user = userCredential.user;
      dispatch(setUser({ email: user.email }));
      dispatch(loadCartFromFirebase(user.email));
      message.success('Login successful!');
      navigate('/category'); 
    } catch (error) {
      message.error(`Login failed: ${error.message}`);
    }
    setIsLoading(false);
    setSubmitting(false);
  };
 
  return (
    <div className="formContainer">
      <Title level={2}>Login</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        
          <Form>
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
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? <Spin /> : 'Login'}
            </Button>
            <div className='signupText'>
              <Link to="/signup">Don't Have an Account? Sign Up Now</Link>
              <Link to="/reset-password">Forgot Password?</Link>
              <Link to="/change-password">Change Password</Link>
            </div>
          </Form>
      </Formik>
    </div>
  );
};

export default Login;
