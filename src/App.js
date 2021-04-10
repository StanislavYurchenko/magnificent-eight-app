import React, { useEffect, Suspense, lazy, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import MainContainer from './components/MainContainer';
import { getCurrentUser } from './redux/auth/authOperations';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme/Theme';
import { GlobalStyles } from './components/Global/Global';
import Toggle from './components/Toggle/Toggle';
import { useDarkMode } from './components/DarkMode/DarkMode';

import PreLoader from './components/PreLoader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';

const MainPage = lazy(() => import('pages/MainPage' /* webpackChunkName: "MainPage" */));
const AuthPage = lazy(() => import('pages/AuthPage' /* webpackChunkName: "AuthPage" */));
const ResultsPage = lazy(() => import('pages/ResultsPage' /* webpackChunkName: "ResultsPage" */));
const ContactsPage = lazy(() =>
  import('pages/ContactsPage' /* webpackChunkName: "ContactsPage" */),
);
const MaterialsPage = lazy(() =>
  import('pages/MaterialsPage' /* webpackChunkName: "MaterialsPage" */),
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage' /* webpackChunkName: "NotFoundPage" */),
);

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentRoute = useRef(location);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        {/* <Header /> */}
        {/* <Container> */}
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        {/* </Container> */}

        <MainContainer>
          <Suspense fallback={<PreLoader sizePreloader="200px" />}>
            <Switch>
              <PrivateRoute exact path="/" redirectTo="/auth">
                <Container>
                  <MainPage />
                </Container>
              </PrivateRoute>

              <PrivateRoute path="/useful-info" redirectTo="/auth">
                <MaterialsPage />
              </PrivateRoute>

              <PublicRoute path="/contacts">
                <Container>
                  <ContactsPage />
                </Container>
              </PublicRoute>

              <PrivateRoute path="/test" redirectTo="/auth">
                <Container>
                  <div>Страница тестов</div>
                </Container>
              </PrivateRoute>

              <PrivateRoute path="/results" redirectTo="/auth">
                <Container>
                  <ResultsPage />
                </Container>
              </PrivateRoute>

              <PublicRoute path="/auth" redirectTo={currentRoute} restricted>
                <Container>
                  <AuthPage />
                </Container>
              </PublicRoute>

              <PublicRoute>
                <Container>
                  <NotFoundPage />
                </Container>
              </PublicRoute>
            </Switch>
          </Suspense>
        </MainContainer>
      </>
    </ThemeProvider>
  );
}

export default App;
