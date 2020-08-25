import React from 'react';
import ReactDOM from 'react-dom';
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline, ThemeProvider, createMuiTheme, ThemeOptions } from '@material-ui/core';
import { DatastoreProvider } from './hooks/datastore';

const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1140,
      xl: 1920
    }
  },
  palette: {
    background: {
      default: '#FFF'
    },
    primary: {
      main: '#ED7014'
    },
  }
};

const theme = createMuiTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DatastoreProvider>
        <App />  
      </DatastoreProvider>
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
