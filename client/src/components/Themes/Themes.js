import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                background: "#69c9c9",
                palette: {
                    primary: {
                        light: "#e8f5f5",
                        main: "#69c9c9",
                    },
                    secondary: {
                        light: "#dbdbdb",
                        main: "#69c9c9",
                        dark: "#ababab",
                    },
                },
            },
        },
    },
});

export default theme;