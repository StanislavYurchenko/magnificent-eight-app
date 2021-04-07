import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import { getCurrentUser } from './redux/auth/authOperations';

import PreLoader from './components/PreLoader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';

const MainPage = lazy(() => import('pages/MainPage/MainPage' /* webpackChunkName: "MainPage" */));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage' /* webpackChunkName: "AuthPage" */));
const ResultsPage = lazy(() =>
  import('pages/ResultsPage/ResultsPage' /* webpackChunkName: "ResultsPage" */),
);
const ContactsPage = lazy(() =>
  import('pages/ContactsPage/ContactsPage' /* webpackChunkName: "ContactsPage" */),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Header />
        <Suspense fallback={<PreLoader sizePreloader="200px" />}>
          <Switch>
            <PrivateRoute exact path="/" redirectTo="/auth">
              <MainPage />
            </PrivateRoute>

            <PrivateRoute path="/useful-info" redirectTo="/auth">
              <div>Страница доп материалов</div>
            </PrivateRoute>

            <PublicRoute path="/contacts">
              <ContactsPage />
            </PublicRoute>

            <PrivateRoute path="/test" redirectTo="/auth">
              <div>Страница тестов</div>
            </PrivateRoute>

            <PrivateRoute path="/results" redirectTo="/auth">
              <ResultsPage />
            </PrivateRoute>

            <PublicRoute path="/auth" redirectTo="/" restricted>
              <AuthPage />
            </PublicRoute>

            <PublicRoute>
              <div>not found</div>
            </PublicRoute>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
