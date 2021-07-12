import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { theme } from './theme';

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
