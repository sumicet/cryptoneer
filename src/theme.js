import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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
            selected: '#524bdb',
            // selected: '#443eb8',
            notSelected: '#363194',
            cardHover: 'rgba(54, 49, 148, 0.3)',
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
        icon: 14 * 1.3, //typography.fontSize * 1.3
    },
});
