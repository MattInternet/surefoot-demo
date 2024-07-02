import { Fragment } from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { AppLayout } from './components/layout';
import { Home } from './routes';
import { observer } from 'mobx-react';

export const App = observer(() => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Fragment>
    )
  );

  return (
    <CssVarsProvider defaultMode='system'>
      <CssBaseline/>
      <RouterProvider router={router} />
    </CssVarsProvider>
  )
});

export default App;
