import React, { useEffect, Suspense, lazy, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useLocation } from 'react-router-dom';
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
const Test = lazy(() => import('./components/Test' /* webpackChunkName: "Test" */));
const MaterialsPage = lazy(() =>
  import('pages/MaterialsPage/MaterialsPage' /* webpackChunkName: "MaterialsPage" */),
);

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentRoute = useRef(location);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<PreLoader sizePreloader="200px" />}>
          <Switch>
            <PrivateRoute exact path="/" redirectTo="/auth">
              <MainPage />
            </PrivateRoute>

            <PublicRoute path="/test-theory">
              <Test />
            </PublicRoute>

            <PublicRoute path="/test-tech">
              <Test />
            </PublicRoute>

            <PrivateRoute path="/useful-info" redirectTo="/auth">
              <div>Страница доп материалов</div>
            </PrivateRoute>

            <PublicRoute path="/contacts">
              <ContactsPage />
            </PublicRoute>

            {/* <PrivateRoute path="/test" redirectTo="/auth">
              <div>Страница тестов</div>
            </PrivateRoute> */}

            <PrivateRoute path="/results" redirectTo="/auth">
              <ResultsPage />
            </PrivateRoute>

            <PublicRoute path="/auth" redirectTo={currentRoute} restricted>
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
