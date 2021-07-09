import { AppBar, Grid, makeStyles, Toolbar } from '@material-ui/core';
import Text from '../text/Text';
import ProjectLogo from './ProjectLogo';
import TextLink from './TextLink';

const useStyles = makeStyles(theme => ({
    footerWrapper: {
        flex: 0,
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.light,
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: 'flex-start',
    },
    footerField: {
        paddingBottom: theme.spacing(8),
        '&:last-child': {
            paddingTop: theme.spacing(8),
            paddingBottom: 0,
        },
    },
    footerList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:nth-child(3)': {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(4),
            },
        },
        '&:nth-child(4)': {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(4),
            },
        },
    },
    footerTextLink: {
        color: theme.palette.text.secondary,
    },
    footerListItem: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(2),
    },
    footerListTitle: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 700,
    },
    footerListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
    },
}));

const fields = [
    ['About us', 'Terms of use', 'Privacy Policy', 'Disclaimer', 'Careers'],
    ['Contact Support', 'FAQ', 'Glossary'],
    ['Instagram', 'Twitter', 'Discord'],
];

const fieldTitles = ['Company', 'Support', 'Socials'];

const Footer = () => {
    const styles = useStyles();

    return (
        <AppBar position="static" className={styles.footerWrapper}>
            <Toolbar className={styles.footer}>
                <div className={styles.footerField}>
                    <ProjectLogo />
                </div>
                <Grid container className={styles.footerListWrapper}>
                    {fieldTitles.map((title, index) => (
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}
                            xl={2}
                            className={styles.footerList}
                        >
                            <div>
                                <Text
                                    size="medium"
                                    className={styles.footerListTitle}
                                >
                                    {title}
                                </Text>
                                {fields[index].map(field => (
                                    <div className={styles.footerListItem}>
                                        <TextLink
                                            to={`/news`}
                                            TextProps={{
                                                className: `${styles.footerTextLink}`,
                                            }}
                                        >
                                            {field}
                                        </TextLink>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                    ))}
                    <Grid
                        item
                        xs={6}
                        sm={12}
                        md={3}
                        lg={2}
                        xl={2}
                        className={styles.footerList}
                    >
                        <Text size="medium" className={styles.footerListTitle}>
                            Address
                        </Text>
                        <Text size="medium">Lorem ipsum dolor sit amet.</Text>
                    </Grid>
                </Grid>

                <div className={styles.footerField}>
                    <Text size="medium">
                        © 2021 Cryptoneer. All rights reserved.
                    </Text>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
