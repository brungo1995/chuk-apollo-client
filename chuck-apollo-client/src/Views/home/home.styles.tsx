import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const HomeStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: "50%",
            marginTop: theme.spacing(10)
        },
        selectEmpty: {
            marginTop: theme.spacing(10),
        },

    }),
);
