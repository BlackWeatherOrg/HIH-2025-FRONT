import React, { useEffect, useState } from "react";
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
    LinearProgress,
    Divider,
    Link,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import CategoryIcon from "@mui/icons-material/Category";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CollectionsIcon from "@mui/icons-material/Collections";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { keyframes } from "@emotion/react";
import PageWrapper from "../components/PageWrapper";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseInstall = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
  50% { transform: scale(1.02); }
  70% { box-shadow: 0 0 0 15px rgba(37,99,235,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const AppDetail = ({ app, onBack, onOpenGallery }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_DESCRIPTION_LENGTH = 200;

    const popularityLabel =
        app.popularity && app.popularity > 800
            ? "Очень популярно"
            : app.popularity && app.popularity > 400
            ? "Популярно"
            : "Набирает обороты";

    const getPopularityPercent = () => {
        return Math.min(100, (app.popularity || 0) / 10);
    };

    const features = [
        { icon: "🔒", text: "Безопасные платежи" },
        { icon: "🚀", text: "Высокая производительность" },
        { icon: "📱", text: "Оптимизированный интерфейс" },
        { icon: "🌙", text: "Ночной режим" },
    ];

    const stats = [
        { label: "Размер", value: app.size || app.apkSize || "85 МБ", icon: <StorageIcon /> },
        { label: "Версия", value: app.version || "2.4.1", icon: <LanguageIcon /> },
        { label: "Пользователей", value: app.downloads || "1M+", icon: <PeopleIcon /> },
        { label: "Безопасность", value: "Высокая", icon: <SecurityIcon /> },
    ];

    const shouldTruncate = app.description && app.description.length > MAX_DESCRIPTION_LENGTH;
    const displayDescription = shouldTruncate && !isExpanded 
        ? `${app.description.substring(0, MAX_DESCRIPTION_LENGTH)}...` 
        : app.description;

    const handleShare = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("appId", app.id);
        const shareUrl = url.toString();

        if (navigator.share) {
            navigator
                .share({
                    title: app.name,
                    text: "Посмотри это приложение в витрине RuStore",
                    url: shareUrl,
                })
                .catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
        } else {
            alert("Скопируйте ссылку из адресной строки.");
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [app?.id]);

    return (
        <PageWrapper>
            <AppBar
                position='sticky'
                color='default'
                elevation={0}
                sx={{
                    bgcolor: "rgba(248,250,252,0.95)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid #e5e7eb",
                    background:
                        "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.95) 100%)",
                }}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={onBack}
                        sx={{
                            "&:hover": {
                                bgcolor: "rgba(37, 99, 235, 0.1)",
                                transform: "scale(1.1)",
                            },
                            transition: "all 0.3s ease",
                        }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        sx={{
                            flex: 1,
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                        noWrap>
                        {app.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    mt: 2,
                    animation: `${fadeUp} 0.5s ease-out`,
                    position: "relative",
                }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: 50,
                        right: 50,
                        width: 100,
                        height: 100,
                        background:
                            "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
                        borderRadius: "50%",
                        animation: `${floatAnimation} 6s ease-in-out infinite`,
                        zIndex: 0,
                    }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            p: { xs: 2.5, md: 3 },
                            borderRadius: 4,
                            border: "1px solid #e5e7eb",
                            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 3,
                            alignItems: { xs: "flex-start", sm: "center" },
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                background: `linear-gradient(90deg, ${
                                    app.accentColor || "#2563eb"
                                }, ${(app.accentColor || "#3b82f6") + "80"})`,
                            },
                        }}>
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: 4,
                                overflow: "hidden",
                                flexShrink: 0,
                                bgcolor: "#eef2ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 8px 25px rgba(37, 99, 235, 0.25)",
                                animation: `${floatAnimation} 3s ease-in-out infinite`,
                            }}>
                            {app.iconLink ? (
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
                                <Avatar
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 4,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        background: `linear-gradient(135deg, ${
                                            app.accentColor || "#2563eb"
                                        } 0%, ${(app.accentColor || "#3b82f6") + "80"} 100%)`,
                                        color: "white",
                                    }}>
                                    {app.name[0]}
                                </Avatar>
                            )}
                        </Box>

                        <Box
                            flex={1}
                            minWidth={0}>
                            <Typography
                                variant='h4'
                                fontWeight={800}
                                gutterBottom
                                sx={{
                                    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}>
                                {app.name}
                            </Typography>

                            <Typography
                                variant='h6'
                                color='text.secondary'
                                mb={2}
                                sx={{ fontWeight: 500 }}>
                                {app.developer}
                            </Typography>

                            <Stack
                                direction='row'
                                spacing={1.5}
                                alignItems='center'
                                flexWrap='wrap'
                                mb={2}>
                                <Chip
                                    icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                                    label={app.category}
                                    size='medium'
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: "#eff6ff",
                                        border: "2px solid #dbeafe",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                    }}
                                />
                                <Chip
                                    label={app.age}
                                    size='medium'
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: "#fef3c7",
                                        border: "2px solid #fde68a",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                    }}
                                />
                                <Stack
                                    direction='row'
                                    spacing={1}
                                    alignItems='center'>
                                    <Rating
                                        value={app.rating}
                                        precision={0.1}
                                        readOnly
                                        size='medium'
                                        sx={{ color: "#f59e0b" }}
                                    />
                                    <Typography
                                        variant='body1'
                                        fontWeight={700}
                                        sx={{ color: "#1e293b" }}>
                                        {app.rating.toFixed(1)}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Box mb={2}>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                    mb={1}>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'>
                                        Популярность
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        fontWeight={600}
                                        color='#2563eb'>
                                        {popularityLabel}
                                    </Typography>
                                </Stack>
                                <LinearProgress
                                    variant='determinate'
                                    value={getPopularityPercent()}
                                    sx={{
                                        height: 8,
                                        borderRadius: 999,
                                        bgcolor: "#f1f5f9",
                                        "& .MuiLinearProgress-bar": {
                                            bgcolor: "#2563eb",
                                            borderRadius: 999,
                                            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                                        },
                                    }}
                                />
                            </Box>

                            {app.editorsChoice && (
                                <Chip
                                    size='medium'
                                    icon={<StarIcon sx={{ fontSize: 18, color: "#f59e0b" }} />}
                                    label='Выбор редакции'
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: "#fef3c7",
                                        border: "2px solid #facc15",
                                        fontWeight: 700,
                                        fontSize: "0.8rem",
                                        color: "#92400e",
                                    }}
                                />
                            )}
                        </Box>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            p: 3,
                            borderRadius: 4,
                            bgcolor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            animation: `${fadeUp} 0.6s ease-out`,
                        }}>
                        <Stack
                            direction='row'
                            spacing={1.5}
                            alignItems='center'
                            mb={2}>
                            <BarChartIcon sx={{ color: "#2563eb" }} />
                            <Typography
                                variant='h6'
                                fontWeight={700}
                                sx={{
                                    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}>
                                Характеристики
                            </Typography>
                        </Stack>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            divider={
                                <Divider
                                    orientation='vertical'
                                    flexItem
                                />
                            }>
                            {stats.map((stat, index) => (
                                <Box
                                    key={index}
                                    textAlign='center'
                                    sx={{ flex: 1 }}>
                                    <Box
                                        sx={{
                                            color: "#2563eb",
                                            mb: 1,
                                            animation: `${floatAnimation} 3s ease-in-out infinite ${
                                                index * 0.2
                                            }s`,
                                        }}>
                                        {stat.icon}
                                    </Box>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        mb={0.5}>
                                        {stat.label}
                                    </Typography>
                                    <Typography
                                        variant='h6'
                                        fontWeight={700}
                                        color='#1e293b'>
                                        {stat.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            p: 3,
                            borderRadius: 4,
                            bgcolor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            animation: `${fadeUp} 0.7s ease-out`,
                        }}>
                        <Stack
                            direction='row'
                            spacing={1.5}
                            alignItems='center'
                            mb={2}>
                            <InfoOutlinedIcon sx={{ color: "#2563eb" }} />
                            <Typography
                                variant='h6'
                                fontWeight={700}
                                sx={{
                                    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}>
                                О приложении
                            </Typography>
                        </Stack>

                        <Typography
                            variant='body1'
                            color='text.secondary'
                            lineHeight={1.8}
                            sx={{ 
                                fontSize: "1.05rem",
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                mb: shouldTruncate ? 2 : 0
                            }}>
                            {displayDescription}
                        </Typography>

                        {shouldTruncate && (
                            <Button
                                onClick={() => setIsExpanded(!isExpanded)}
                                variant="text"
                                size="small"
                                endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    color: '#2563eb',
                                    '&:hover': {
                                        backgroundColor: 'rgba(37, 99, 235, 0.04)',
                                    },
                                    borderRadius: 2,
                                    px: 2,
                                }}
                            >
                                {isExpanded ? 'Свернуть' : 'Читать больше'}
                            </Button>
                        )}
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            p: 3,
                            borderRadius: 4,
                            bgcolor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            animation: `${fadeUp} 0.8s ease-out`,
                        }}>
                        <Stack
                            direction='row'
                            spacing={1.5}
                            alignItems='center'
                            mb={2}>
                            <AutoAwesomeIcon sx={{ color: "#7c3aed" }} />
                            <Typography
                                variant='h6'
                                fontWeight={700}
                                sx={{
                                    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}>
                                Основные возможности
                            </Typography>
                        </Stack>

                        <Stack spacing={2}>
                            {features.map((feature, index) => (
                                <Stack
                                    key={index}
                                    direction='row'
                                    spacing={2}
                                    alignItems='center'>
                                    <Box
                                        sx={{
                                            fontSize: "24px",
                                            animation: `${floatAnimation} 3s ease-in-out infinite ${
                                                index * 0.3
                                            }s`,
                                        }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant='body1'
                                        color='text.primary'
                                        fontWeight={500}>
                                        {feature.text}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>

                    <Box
                        sx={{
                            mb: 3,
                            animation: `${fadeUp} 0.9s ease-out`,
                        }}>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            mb={2}>
                            <Stack
                                direction='row'
                                spacing={1.5}
                                alignItems='center'>
                                <CollectionsIcon sx={{ color: "#2563eb" }} />
                                <Typography
                                    variant='h6'
                                    fontWeight={700}
                                    sx={{
                                        background:
                                            "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        color: "transparent",
                                    }}>
                                    Скриншоты
                                </Typography>
                            </Stack>

                            <Button
                                variant='outlined'
                                size='medium'
                                onClick={() => onOpenGallery(0)}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    px: 2.5,
                                    border: "2px solid #e5e7eb",
                                    "&:hover": {
                                        border: "2px solid #2563eb",
                                        bgcolor: "rgba(37, 99, 235, 0.05)",
                                    },
                                }}>
                                Открыть галерею
                            </Button>
                        </Stack>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                overflowX: "auto",
                                pb: 2,
                                "&::-webkit-scrollbar": { height: 6 },
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
                                        minWidth: 260,
                                        maxWidth: 300,
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        border: "1px solid #e5e7eb",
                                        bgcolor: "#ffffff",
                                        transition:
                                            "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
                                        position: "relative",
                                        "&:hover": {
                                            transform: "translateY(-6px) scale(1.02)",
                                            boxShadow: "0 20px 40px rgba(15,23,42,0.2)",
                                            borderColor: "#2563eb",
                                        },
                                    }}>
                                    <CardMedia
                                        component='img'
                                        image={src}
                                        alt={`${app.name} screenshot ${idx + 1}`}
                                        sx={{
                                            display: "block",
                                            width: "100%",
                                            height: 210,
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card>
                            ))}
                        </Box>
                    </Box>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{ mb: 1 }}>
                        <Button
                            fullWidth
                            size='large'
                            variant='contained'
                            href={app.apkLink}
                            startIcon={<DownloadIcon />}
                            sx={{
                                borderRadius: 3,
                                py: 1.8,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: 18,
                                background:
                                    "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
                                boxShadow: "0 20px 45px rgba(37,99,235,0.5)",
                                "&:hover": {
                                    boxShadow: "0 25px 55px rgba(37,99,235,0.7)",
                                },
                            }}>
                            Установить
                        </Button>
                        <Button
                            variant='outlined'
                            size='large'
                            startIcon={<ShareIcon />}
                            onClick={handleShare}
                            sx={{
                                minWidth: { xs: "100%", sm: 170 },
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 600,
                                borderWidth: 2,
                                "&:hover": {
                                    borderWidth: 2,
                                },
                            }}>
                            Поделиться
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </PageWrapper>
    );
};

export default AppDetail;