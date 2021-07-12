import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Text from '../../text/Text';
import Logo from '../header/Logo';
import TextLink from '../../text/TextLink';
import { useStyles } from './styles';

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
                    <Logo />
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
                                    <div className={styles.footerItem}>
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
