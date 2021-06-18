import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import List from './card/List';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import colors from './constants/colors';

// cryptoneer
// side list with top 3 of 50 crypto against btc
// meme spot
// content creator spot

function App() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            text: {
                primary: colors.primaryText,
                secondary: colors.secondaryText,
            },
        },
        typography: {
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
    });
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <List />
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
