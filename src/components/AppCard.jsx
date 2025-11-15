import React from "react";
import { Paper, Box, Stack, Typography, Rating, Chip } from "@mui/material";

const AppCard = ({ app, onClick }) => {
    const hasIcon = !!app.iconLink;

    return (
        <Paper
            elevation={0}
            onClick={onClick}
            sx={{
                p: 1.8,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                display: "flex",
                gap: 1.6,
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease",
                bgcolor: "#ffffff",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 30px rgba(15,23,42,0.14)",
                    borderColor: "rgba(37,99,235,0.45)",
                },
            }}>
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2.5,
                    overflow: "hidden",
                    flexShrink: 0,
                    bgcolor: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                {hasIcon ? (
                    <Box
                        component='img'
                        src={app.iconLink}
                        alt={app.name}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                        onError={e => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <Typography
                        variant='h6'
                        fontWeight={700}
                        sx={{ color: "#1f2933" }}>
                        {app.name?.[0] || "?"}
                    </Typography>
                )}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant='subtitle1'
                    fontWeight={600}
                    noWrap>
                    {app.name}
                </Typography>

                <Typography
                    variant='body2'
                    color='text.secondary'
                    noWrap>
                    {app.developer}
                </Typography>

                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    mt={0.8}
                    flexWrap='wrap'>
                    {app.rating != null && (
                        <Stack
                            direction='row'
                            spacing={0.5}
                            alignItems='center'>
                            <Rating
                                value={app.rating}
                                precision={0.1}
                                size='small'
                                readOnly
                            />
                            <Typography
                                variant='body2'
                                color='text.secondary'>
                                {app.rating.toFixed(1)}
                            </Typography>
                        </Stack>
                    )}

                    {app.category && (
                        <Chip
                            label={app.category}
                            size='small'
                            sx={{
                                borderRadius: 999,
                                bgcolor: "#f3f4f6",
                            }}
                        />
                    )}
                </Stack>
            </Box>
        </Paper>
    );
};

export default AppCard;