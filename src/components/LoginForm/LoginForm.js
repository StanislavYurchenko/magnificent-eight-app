import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';

import PreLoader from '../PreLoader';
import { loginUser } from '../../redux/auth/authOperations';
import { loading, error } from '../../redux/auth/authSelectors';

import { useStyles } from './LoginForm.style';

const LoginForm = ({ handleToggleButton }) => {
  const dispatch = useDispatch();
  const loadingAuth = useSelector(loading);
  const errorAuth = useSelector(error);
  const { handleSubmit, control, reset } = useForm();
  const classes = useStyles();

  const validation = (value, num, text, email) => {
    if (email) {
      return !validateEmail(value) ? text : '';
    }
    return value.length < num ? text : '';
  };

  const validateEmail = email => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = data => {
    if (!validateEmail(data.email)) return;
    dispatch(loginUser(data));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <TextField
              className={classes.inputText}
              onChange={onChange}
              value={value}
              label="E-mail"
              variant="outlined"
              error={value.length !== 0 && !validateEmail(value) ? true : false}
              helperText={value.length !== 0 && !validateEmail(value) ? 'Enter correct email.' : ''}
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ minLength: 8 }}
          render={({ onChange, value }) => (
            <TextField
              className={classes.inputText}
              type="password"
              onChange={onChange}
              value={value}
              label="Password"
              variant="outlined"
              error={
                value.length !== 0 &&
                !!validation(value, 8, 'Password must be at least 8 characters.')
              }
              helperText={
                value.length !== 0 &&
                validation(value, 8, 'Password must be at least 8 characters.')
              }
              required
            />
          )}
        />

        <div>
          <Button type="submit" variant="contained">
            {loadingAuth ? <PreLoader sizePreloader="16px" /> : 'SIGN IN'}
          </Button>
          <Button type="button" onClick={handleToggleButton}>
            SIGN UP
          </Button>
        </div>
      </form>
      {!!errorAuth && <p>Invalid email or password! Try again!</p>}
    </div>
  );
};

export default LoginForm;
