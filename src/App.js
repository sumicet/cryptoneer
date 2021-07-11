import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
    useTheme,
} from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

// cryptoneer
// side list with top 3 of 50 crypto against btc
// meme spot
// content creator spot

function App() {
    const defaultTheme = useTheme();

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            text: {
                primary: '#ffffff',
                secondary: 'rgba(255, 255, 255, 0.9)',
                // "Enjoy music"
                accentDark: '#917dff',
                accentLight: '#48d9e2',
                accentPink: '#f26ccb',
                accentLightPink: '#ed8acf',
                bullish: 'lime',
                bearish: 'red',
            },
            background: {
                light: '#212078',
                dark: '#1a144e',
                cardLight: '#39349a',
                cardDark: '#312b90',
                // Top part of the picture - gradient
                sectionLight: '#326cc5',
                sectionDark: '#302f89',
                selected: '#443eb8',
                cardHover: 'rgba(57, 52, 154, 0.6)',
            },
            button: {
                primary: 'rgba(255, 255, 255, 0.1)',
                hover: '#443eb8',
                ripple: 'rgba(255, 255, 255, 0.1)',
            },
            icon: {
                hot: '#f26ccb',
                bullish: 'lime',
                bearish: 'red',
            },
            divider: 'rgba(255, 255, 255, 0.15)',
            warning: {
                main: 'rgba(255, 152, 0, 0.5)',
            },
        },
        shape: {
            borderRadius: '20px',
        },
        typography: {
            fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
        sizing: {
            maxWidth: '1400px',
            icon: defaultTheme.typography.fontSize * 1.3,
        },
    });
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
