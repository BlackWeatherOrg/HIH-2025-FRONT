import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#f3f4f6",
            paper: "#ffffff",
        },
        primary: {
            main: "#2563eb",
        },
        secondary: {
            main: "#22c55e",
        },
        text: {
            primary: "#0f172a",
            secondary: "#6b7280",
        },
    },
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
    },
});

export default theme;