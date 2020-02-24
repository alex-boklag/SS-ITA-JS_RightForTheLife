import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuthChecker } from '../../helpers/useAuthChecker';

export const LoginPage = () => {
  const history = useHistory();
  const authApi = 'http://localhost:4000/auth/signin';
  const isUserLoggedIn = useAuthChecker();

  const [isPasswordCanBeSeen, setIsPasswordCanBeSeen] = useState(false);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors = {};
      const requiredFiledText = 'Заполните это поле';
      if (!values.email) errors.email = requiredFiledText;
      if (!values.password) errors.password = requiredFiledText;
      return errors;
    },
    onSubmit: values => {
      fetch(authApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (response.status === 401) throw new Error('false credentials');
          return response.text();
        })
        .then(data => {
          if (data) {
            sessionStorage.setItem('token', data);
            history.push('/');
          } else {
            throw new Error('no login data has been recived!');
          }
        })
        .catch(error => {
          if (error.message === 'false credentials') {
            setIsWrongCredentials(true);
          } else {
            console.error(error);
          }
        });
    },
  });

  const handleShowPasswordButtonClick = event => {
    event.preventDefault();
    setIsPasswordCanBeSeen(!isPasswordCanBeSeen);
  };

  const logoutButtonClickHandler = () => {
    sessionStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      {isUserLoggedIn ? (
        <div className="max-w-xs text-lightgray-700">
          <h1 className="text-3xl font-medium mb-8 ml-2">Вы залогинены</h1>
          <button
            onClick={logoutButtonClickHandler}
            className="bg-orange-300 hover:bg-orange-400 text-orange-700 font-bold py-3 px-4 rounded-xl focus:outline-none block mx-auto"
          >
            Выйти
          </button>
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="flex-grow max-w-xs text-lightgray-700"
        >
          <h1 className="text-3xl font-medium mb-8 ml-2">Добро пожаловать!</h1>
          <div className="mb-6">
            <label htmlFor="email" className="block ml-2">
              Ваша почта:
              <input
                id="email"
                type="email"
                className="block w-full rounded-full h-10 px-4 text-lg font-medium focus:outline-none"
                {...formik.getFieldProps('email')}
              />
            </label>
            <div className="ml-2 text-xs text-red-600 h-1">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block ml-2">
              Пароль:
              <div className="relative">
                <input
                  id="password"
                  type={isPasswordCanBeSeen ? 'text' : 'password'}
                  className="block w-full rounded-full h-10 px-4 text-lg font-medium focus:outline-none"
                  {...formik.getFieldProps('password')}
                />
                <button
                  onClick={handleShowPasswordButtonClick}
                  className="h-10 w-10 rounded-full absolute right-0 top-0 flex items-center justify-center cursor-pointer focus:outline-none"
                >
                  <i
                    className={`far ${
                      isPasswordCanBeSeen ? 'fa-eye-slash' : 'fa-eye'
                    }`}
                  />
                </button>
              </div>
            </label>
            <div className="ml-2 text-xs text-red-600 h-1">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </div>
          </div>
          {isWrongCredentials ? (
            <div className="text-red-600 text-center mb-6 font-medium">
              Неверный логин или пароль
            </div>
          ) : null}
          <button
            type="submit"
            className="bg-orange-300 hover:bg-orange-400 text-orange-700 font-bold py-3 px-4 rounded-xl focus:outline-none block ml-auto"
          >
            Войти
          </button>
        </form>
      )}
    </div>
  );
};
