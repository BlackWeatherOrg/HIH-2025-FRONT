import React from "react";
import { Card, CardContent, Box, Avatar, Typography, Stack, Rating, Chip } from "@mui/material";

const AppCard = ({ app, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                display: "flex",
                alignItems: "stretch",
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid #e5e7eb",
                bgcolor: "#ffffff",
                transition: "transform 0.18s ease, box-shadow 0.18s ease, border 0.18s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 18px 35px rgba(15,23,42,0.13)",
                    borderColor: "rgba(37,99,235,0.45)",
                },
            }}>
            <Box
                sx={{
                    width: 74,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}>
                <Avatar
                    sx={{
                        width: 54,
                        height: 54,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 24,
                        background: `radial-gradient(circle at 25% 0, #ffffff, ${
                            app.accentColor || "#2563eb"
                        })`,
                        color: "#0f172a",
                    }}>
                    {app.name[0]}
                </Avatar>
            </Box>

            <CardContent sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                    mb={0.5}>
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        noWrap
                        sx={{ maxWidth: "70%" }}>
                        {app.name}
                    </Typography>
                    <Chip
                        label={app.category}
                        size='small'
                        sx={{
                            ml: "auto",
                            borderRadius: 999,
                            bgcolor: "#eff6ff",
                            color: "#1d4ed8",
                            fontSize: 11,
                        }}
                    />
                </Stack>

                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    mb={0.5}>
                    <Rating
                        value={app.rating}
                        precision={0.1}
                        readOnly
                        size='small'
                    />
                    <Typography
                        variant='body2'
                        color='text.secondary'>
                        {app.rating.toFixed(1)}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'>
                        • {app.age}
                    </Typography>
                </Stack>

                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}>
                    {app.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AppCard;