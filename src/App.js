import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, useTheme } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { theme } from './theme';
import { useEffect } from 'react';

// cryptoneer
// side list with top 3 of 50 crypto against btc
// meme spot
// content creator spot

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes />
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
