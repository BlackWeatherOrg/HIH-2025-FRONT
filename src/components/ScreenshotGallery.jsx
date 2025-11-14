import React from "react";
import { Dialog, DialogContent, AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return (
        <Slide
            direction='up'
            ref={ref}
            {...props}
        />
    );
});

const ScreenshotGallery = ({ open, onClose, app, index, onChangeIndex }) => {
    if (!app) return null;

    const handlePrev = () => {
        onChangeIndex(index === 0 ? app.screenshots.length - 1 : index - 1);
    };

    const handleNext = () => {
        onChangeIndex(index === app.screenshots.length - 1 ? 0 : index + 1);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    bgcolor: "#0f172a",
                    color: "#f9fafb",
                },
            }}>
            <AppBar
                position='sticky'
                color='transparent'
                elevation={0}
                sx={{ bgcolor: "rgba(15,23,42,0.95)" }}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={onClose}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        sx={{ flex: 1 }}>
                        {app.name}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{ color: "#e5e7eb" }}>
                        {index + 1} / {app.screenshots.length}
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    p: 0,
                }}>
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(15,23,42,0.8)",
                        "&:hover": { bgcolor: "rgba(15,23,42,1)" },
                    }}>
                    <ChevronLeftIcon htmlColor='#f9fafb' />
                </IconButton>

                <Box
                    component='img'
                    src={app.screenshots[index]}
                    alt={`${app.name} screenshot ${index + 1}`}
                    sx={{
                        maxWidth: "100%",
                        maxHeight: "100vh",
                        objectFit: "contain",
                    }}
                />

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(15,23,42,0.8)",
                        "&:hover": { bgcolor: "rgba(15,23,42,1)" },
                    }}>
                    <ChevronRightIcon htmlColor='#f9fafb' />
                </IconButton>
            </DialogContent>
        </Dialog>
    );
};

export default ScreenshotGallery;