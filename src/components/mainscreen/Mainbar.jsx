import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

const MainAppBar = ({ onOpenCategories }) => {
    return (
        <AppBar
            position='sticky'
            color='default'
            elevation={0}
            sx={{
                bgcolor: "rgba(248,250,252,0.9)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid #e5e7eb",
            }}>
            <Toolbar>
                <Box
                    component='img'
                    src='https://static.rustore.ru/rustore-strapi/6/logo_color_30_px_2_fa2039288f.svg'
                    alt='RuStore'
                    sx={{
                        width: 128,
                        height: 64,
                    }}
                />

                <Box sx={{ flexGrow: 1 }} />

                <Button
                    color='inherit'
                    startIcon={<CategoryIcon />}
                    onClick={onOpenCategories}
                    sx={{ textTransform: "none", borderRadius: 999 }}>
                    Категории
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppBar;