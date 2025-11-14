import React from "react";
import { Box, Container, useMediaQuery } from "@mui/material";

const PageWrapper = ({ children, withContainer = true }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    const content = withContainer ? (
        <Container
            maxWidth='lg' 
            sx={{
                py: 3,
                pb: 5,
                px: isMobile ? 2 : 3,
            }}>
            {children}
        </Container>
    ) : (
        children
    );

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f3f4f6",
                backgroundImage:
                    "radial-gradient(circle at 0 0, rgba(37,99,235,0.05), transparent 55%), radial-gradient(circle at 100% 100%, rgba(34,197,94,0.05), transparent 55%)",
            }}>
            {content}
        </Box>
    );
};

export default PageWrapper;
