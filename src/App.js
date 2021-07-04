import './App.css';

import { Provider } from 'react-redux';
import { store } from './store';
import {
    Container,
    createMuiTheme,
    ThemeProvider,
    makeStyles,
    useTheme,
} from '@material-ui/core';
import Nav from './components/nav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Article from './screens/news/Article';
import News from './components/screens/News';
import FearAndGreedIndex from './screens/globalMetrics/FearAndGreedIndex';

// cryptoneer
// side list with top 3 of 50 crypto against btc
// meme spot
// content creator spot

const useStyles = makeStyles(theme => ({
    bodyContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        background: 'linear-gradient(#212078, #1a144e 10%)',
    },
    body: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: `1400px`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    },
}));

function App() {
    const styles = useStyles();
    const defaultTheme = useTheme();

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            text: {
                primary: '#ffffff',
                secondary: 'rgba(255, 255, 255, 0.9)',
                // "Enjoy music"
                accentDark: '#4e62ee',
                accentLight: '#48d9e2',
                accentPink: '#f26ccb',
                accentLightPink: '#ed8acf',
            },
            background: {
                light: '#212078',
                dark: '#1a144e',
                cardLight: '#39349a',
                cardDark: '#312b90',
                // Top part of the picture - gradient
                sectionLight: '#326cc5',
                sectionDark: '#302f89',
                cardHover: 'rgba(242, 108, 203, 0.1)',
            },
            button: {
                primary: 'rgba(255, 255, 255, 0.1)',
                hover: '#39349a',
                ripple: 'rgba(255, 255, 255, 0.1)',
            },
            icon: {
                hot: '#f26ccb',
                bullish: 'lime',
                bearish: 'red',
            },
            divider: 'rgba(255, 255, 255, 0.15)',
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
                <Router className={styles.router}>
                    <Nav />
                    <div className={styles.bodyContainer}>
                        <Container className={styles.body}>
                            <Switch>
                                <Route path="/" exact>
                                    <News />
                                </Route>
                                <Route path="/home">
                                    <News />
                                </Route>
                                <Route path="/news" exact>
                                    <News />
                                </Route>
                                <Route path="/news/:id" exact>
                                    <Article />
                                </Route>
                                <Route path="/global-metrics/fear-and-greed-index">
                                    <FearAndGreedIndex />
                                </Route>
                            </Switch>
                        </Container>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
