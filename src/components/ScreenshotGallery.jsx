import React, { useEffect } from "react";
import { Dialog, Box, IconButton, Typography, Stack, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const ScreenshotGallery = ({ open, onClose, app, index, onChangeIndex }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    if (!app || !app.screenshots || app.screenshots.length === 0) {
        return null;
    }

    const total = app.screenshots.length;
    const current = Math.max(0, Math.min(index || 0, total - 1));
    const src = app.screenshots[current];

    const prev = () => onChangeIndex?.((current - 1 + total) % total);
    const next = () => onChangeIndex?.((current + 1) % total);

    useEffect(() => {
        if (!open) return;
        const key = e => {
            if (e.key === "Escape") onClose?.();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, [open, current]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            PaperProps={{
                sx: {
                    backgroundColor: "transparent",
                    m: 0,
                },
            }}
            BackdropProps={{
                sx: {
                    background: "rgba(255,255,255,0.75)", 
                    backdropFilter: "blur(6px)",
                },
            }}>
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    overflow: "hidden", 
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, sm: 3 },
                    boxSizing: "border-box",
                }}>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                        width: "100%",
                        maxWidth: 900,
                        mx: "auto",
                    }}>
                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'>
                        <PhoneIphoneIcon sx={{ color: "#2563eb" }} />
                        <Box>
                            <Typography
                                variant='subtitle1'
                                fontWeight={600}>
                                {app.name}
                            </Typography>
                            <Typography
                                variant='caption'
                                color='text.secondary'>
                                Скриншот {current + 1} из {total}
                            </Typography>
                        </Box>
                    </Stack>

                    <IconButton
                        onClick={onClose}
                        sx={{
                            borderRadius: 999,
                            border: "1px solid #e5e7eb",
                            bgcolor: "#ffffff",
                            "&:hover": { bgcolor: "#f1f5f9" },
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        width: "100%",
                        maxWidth: 900,
                        mx: "auto",
                    }}>
                    {!isMobile && total > 1 && (
                        <IconButton
                            onClick={prev}
                            sx={{
                                borderRadius: "50%",
                                border: "1px solid #e5e7eb",
                                bgcolor: "#ffffff",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                "&:hover": {
                                    bgcolor: "#eff6ff",
                                    borderColor: "#bfdbfe",
                                },
                            }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )}

                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: isMobile ? 300 : 400,
                            borderRadius: 5,
                            p: 1.5,
                            bgcolor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                        }}>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: isMobile ? 300 : 400,
                                maxHeight: isMobile ? "70vh" : "75vh", 
                                borderRadius: 5,
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#000",
                            }}>
                            <img
                                src={src}
                                alt='screenshot'
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain", 
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>

                    {!isMobile && total > 1 && (
                        <IconButton
                            onClick={next}
                            sx={{
                                borderRadius: "50%",
                                border: "1px solid #e5e7eb",
                                bgcolor: "#ffffff",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                "&:hover": {
                                    bgcolor: "#eff6ff",
                                    borderColor: "#bfdbfe",
                                },
                            }}>
                            <ChevronRightIcon />
                        </IconButton>
                    )}
                </Box>

                {isMobile && total > 1 && (
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='center'
                        spacing={2}
                        mt={2}>
                        <IconButton onClick={prev}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant='body2'>
                            {current + 1} / {total}
                        </Typography>
                        <IconButton onClick={next}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Stack>
                )}
            </Box>
        </Dialog>
    );
};

export default ScreenshotGallery;