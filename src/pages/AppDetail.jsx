import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Stack,
    Chip,
    Rating,
    Button,
    Card,
    CardMedia,
    Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import CategoryIcon from "@mui/icons-material/Category";
import { keyframes } from "@emotion/react";
import PageWrapper from "../components/PageWrapper";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseInstall = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
  70% { box-shadow: 0 0 0 12px rgba(37,99,235,0); }
  100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
`;

const AppDetail = ({ app, onBack, onOpenGallery }) => {
    const popularityLabel =
        app.popularity && app.popularity > 800
            ? "Очень популярно"
            : app.popularity && app.popularity > 400
            ? "Популярно"
            : "Набирает обороты";

    return (
        <PageWrapper>
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
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={onBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        sx={{ flex: 1 }}
                        noWrap>
                        {app.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 2, animation: `${fadeUp} 0.35s ease-out` }}>
                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: { xs: 2.2, md: 2.8 },
                        borderRadius: 4,
                        border: "1px solid #e5e7eb",
                        bgcolor: "linear-gradient(135deg,#ffffff,#f3f4ff)",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2.5,
                        alignItems: { xs: "flex-start", sm: "center" },
                    }}>
                    <Avatar
                        sx={{
                            width: 84,
                            height: 84,
                            borderRadius: 6,
                            fontSize: 34,
                            fontWeight: 700,
                            background: `radial-gradient(circle at 20% 0, #ffffff, ${
                                app.accentColor || "#2563eb"
                            })`,
                            color: "#0f172a",
                            flexShrink: 0,
                        }}>
                        {app.name[0]}
                    </Avatar>

                    <Box
                        flex={1}
                        minWidth={0}>
                        <Typography
                            variant='h5'
                            fontWeight={700}
                            gutterBottom>
                            {app.name}
                        </Typography>

                        <Typography
                            variant='body2'
                            color='text.secondary'
                            mb={1.5}>
                            {app.developer}
                        </Typography>

                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                            flexWrap='wrap'
                            mb={1.5}>
                            <Chip
                                icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                                label={app.category}
                                size='small'
                                sx={{
                                    borderRadius: 999,
                                    bgcolor: "#eff6ff",
                                    border: "1px solid #dbeafe",
                                }}
                            />
                            <Chip
                                label={app.age}
                                size='small'
                                sx={{
                                    borderRadius: 999,
                                    bgcolor: "#fef3c7",
                                    border: "1px solid #fde68a",
                                }}
                            />
                            <Stack
                                direction='row'
                                spacing={0.5}
                                alignItems='center'>
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
                            </Stack>
                        </Stack>

                        <Stack
                            direction='row'
                            spacing={2}
                            flexWrap='wrap'>
                            <Stack spacing={0.2}>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'>
                                    Популярность
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight={600}>
                                    {popularityLabel}
                                </Typography>
                            </Stack>
                            {app.editorsChoice && (
                                <Chip
                                    size='small'
                                    icon={<StarIcon sx={{ fontSize: 16 }} />}
                                    label='Выбор редакции'
                                    sx={{
                                        borderRadius: 999,
                                        bgcolor: "#fef3c7",
                                        border: "1px solid #facc15",
                                        fontWeight: 600,
                                        fontSize: 12,
                                    }}
                                />
                            )}
                        </Stack>
                    </Box>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: { xs: 2.2, md: 2.6 },
                        borderRadius: 4,
                        bgcolor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        animation: `${fadeUp} 0.45s ease-out`,
                    }}>
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        mb={1.5}>
                        О приложении
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        lineHeight={1.7}>
                        {app.description}
                    </Typography>
                </Paper>

                <Box
                    sx={{
                        mb: 3,
                        animation: `${fadeUp} 0.55s ease-out`,
                    }}>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        mb={1.2}>
                        <Typography
                            variant='subtitle1'
                            fontWeight={600}>
                            Скриншоты
                        </Typography>
                        <Button
                            size='small'
                            variant='text'
                            onClick={() => onOpenGallery(0)}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: 999,
                                px: 1.5,
                            }}>
                            Открыть галерею
                        </Button>
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            overflowX: "auto",
                            pb: 1,
                            "&::-webkit-scrollbar": { height: 4 },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#d1d5db",
                                borderRadius: 999,
                            },
                        }}>
                        {app.screenshots.map((src, idx) => (
                            <Card
                                key={idx}
                                onClick={() => onOpenGallery(idx)}
                                sx={{
                                    minWidth: 220,
                                    maxWidth: 260,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    border: "1px solid #e5e7eb",
                                    backgroundColor: "#0b1120",
                                    transition:
                                        "transform 0.18s ease, box-shadow 0.18s ease, border 0.18s ease",
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                        boxShadow: "0 20px 40px rgba(15,23,42,0.35)",
                                        borderColor: "rgba(37,99,235,0.55)",
                                    },
                                }}>
                                <CardMedia
                                    component='img'
                                    image={src}
                                    alt={`${app.name} screenshot ${idx + 1}`}
                                    sx={{
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Card>
                        ))}
                    </Box>
                </Box>

                <Button
                    fullWidth
                    size='large'
                    variant='contained'
                    startIcon={<DownloadIcon />}
                    sx={{
                        borderRadius: 999,
                        py: 1.4,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: 16,
                        backgroundImage: "linear-gradient(135deg,#2563eb,#4f46e5)",
                        boxShadow: "0 18px 40px rgba(37,99,235,0.45)",
                        animation: `${pulseInstall} 2.5s ease-out infinite`,
                        "&:hover": {
                            backgroundImage: "linear-gradient(135deg,#1d4ed8,#4338ca)",
                            boxShadow: "0 22px 46px rgba(37,99,235,0.6)",
                        },
                    }}>
                    Установить
                </Button>
            </Box>
        </PageWrapper>
    );
};

export default AppDetail;