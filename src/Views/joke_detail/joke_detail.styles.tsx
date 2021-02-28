import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const JokeDetailStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(10),
        },

        root: {
            flexGrow: 1,
        },

        paper: {
            padding: theme.spacing(3),
            // textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop: theme.spacing(2),
            lineHeight: 1.5
        },

        typography: {
            marginTop: theme.spacing(2)
        },

        rootMedia: {
            maxWidth: 345,
        },

        media: {
            height: 140,
        },

        link: {
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem"
        }

    }),
);

