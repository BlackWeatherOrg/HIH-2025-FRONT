import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Paper,
    Box,
    Stack,
    Chip,
    Avatar,
    LinearProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { keyframes } from "@emotion/react";
import PageWrapper from "../components/PageWrapper";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CategoriesScreen = ({ categories, onBack, onSelectCategory, apps, viewsByCategory }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const totalApps = apps.length;
    const totalViews = Object.values(viewsByCategory || {}).reduce((acc, v) => acc + v, 0);

    const viewedApprox = Math.min(totalViews, totalApps);
    const overallPercent = totalApps ? Math.min(100, (viewedApprox / totalApps) * 100) : 0;

    const getCategoryStats = cat => {
        if (cat === "Все") {
            return {
                total: totalApps,
                viewed: viewedApprox,
                percent: overallPercent,
            };
        }

        const totalInCategory = apps.filter(a => a.category === cat).length;
        const viewedInCategory = (viewsByCategory && viewsByCategory[cat]) || 0;
        const percent =
            totalInCategory > 0 ? Math.min(100, (viewedInCategory / totalInCategory) * 100) : 0;

        return {
            total: totalInCategory,
            viewed: Math.min(viewedInCategory, totalInCategory),
            percent,
        };
    };

    const getCategoryColors = cat => {
        switch (cat) {
            case "Финансы":
                return { dot: "#16a34a", bg: "#dcfce7", emoji: "💰" };
            case "Игры":
                return { dot: "#8b5cf6", bg: "#ede9fe", emoji: "🎮" };
            case "Государственные":
                return { dot: "#2563eb", bg: "#dbeafe", emoji: "🏛️" };
            case "Транспорт":
                return { dot: "#f97316", bg: "#ffedd5", emoji: "🚗" };
            case "Инструменты":
                return { dot: "#4b5563", bg: "#e5e7eb", emoji: "🛠️" };
            default:
                return { dot: "#4f46e5", bg: "#e0e7ff", emoji: "📱" };
        }
    };

    const getCategoryIcon = (cat) => {
        const { emoji } = getCategoryColors(cat);
        return (
            <Box
                sx={{
                    fontSize: isMobile ? "18px" : "20px",
                    animation: `${floatAnimation} 3s ease-in-out infinite`,
                }}
            >
                {emoji}
            </Box>
        );
    };

    const topCategories = Object.entries(viewsByCategory || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cat]) => cat);

    const findTopAppInCategory = cat => {
        const list = cat === "Все" ? apps : apps.filter(a => a.category === cat);

        if (!list.length) return null;
        return [...list].sort((a, b) => {
            const popDiff = (b.popularity || 0) - (a.popularity || 0);
            if (popDiff !== 0) return popDiff;
            return (b.rating || 0) - (a.rating || 0);
        })[0];
    };

    const renderTopAppPreview = app => {
        if (!app) return (
            <Box
                sx={{
                    width: isMobile ? "100%" : 160,
                    p: isMobile ? 1 : 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(248,250,252,0.8)",
                    border: "1px dashed rgba(148,163,184,0.4)",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "0.7rem" : "0.75rem" }}
                >
                    Нет данных
                </Typography>
            </Box>
        );

        return (
            <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{
                    width: isMobile ? "100%" : 160,
                    p: isMobile ? 1 : 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(148,163,184,0.4)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                }}>
                <Avatar
                    sx={{
                        width: isMobile ? 28 : 32,
                        height: isMobile ? 28 : 32,
                        fontSize: isMobile ? 14 : 16,
                        fontWeight: 600,
                        bgcolor: app.accentColor || "#2563eb",
                        animation: `${pulseAnimation} 2s ease-in-out infinite`,
                    }}>
                    {app.name[0]}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        variant='body2'
                        fontWeight={600}
                        noWrap
                        sx={{ 
                            fontSize: isMobile ? "0.75rem" : "0.8rem",
                            lineHeight: 1.2
                        }}
                    >
                        {app.name}
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                        sx={{ mt: 0.25 }}
                    >
                        <StarIcon sx={{ 
                            fontSize: isMobile ? 10 : 12, 
                            color: "#f59e0b" 
                        }} />
                        <Typography
                            variant='caption'
                            color='text.secondary'
                            sx={{ 
                                fontSize: isMobile ? "0.65rem" : "0.7rem",
                                lineHeight: 1.2
                            }}
                        >
                            {app.rating?.toFixed(1) || "—"}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        );
    };

    const getAchievementLevel = (percent) => {
        if (percent >= 80) return { text: "Эксперт", color: "#f59e0b", icon: "🏆" };
        if (percent >= 50) return { text: "Продвинутый", color: "#8b5cf6", icon: "⭐" };
        if (percent >= 25) return { text: "Новичок", color: "#16a34a", icon: "🌱" };
        return { text: "Начинающий", color: "#6b7280", icon: "🔍" };
    };

    const handleCategorySelect = (cat) => {
        if (cat === "Все") {
            onBack(); 
        } else {
            onSelectCategory(cat);
        }
    };

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
                        onClick={onBack}
                        sx={{
                            '&:hover': {
                                bgcolor: 'rgba(37, 99, 235, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        sx={{ 
                            fontWeight: 700, 
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
                            backgroundClip: 'text', 
                            WebkitBackgroundClip: 'text', 
                            color: 'transparent',
                            fontSize: isMobile ? '1.1rem' : '1.25rem'
                        }}>
                        Категории приложений
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    mt: isMobile ? 2 : 2.5,
                    animation: `${fadeUp} 0.3s ease-out`,
                    px: isMobile ? 1.5 : 0,
                }}>

                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: isMobile ? 2 : 3, 
                        borderRadius: isMobile ? 3 : 4,
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
                        border: "1px solid #e0f2fe",
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: isMobile ? -40 : -60, 
                            right: isMobile ? -40 : -60, 
                            width: isMobile ? 80 : 120, 
                            height: isMobile ? 80 : 120, 
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                        }
                    }}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={isMobile ? 2 : 3} 
                        alignItems={{ xs: "flex-start", sm: "center" }}>
                        <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
                            <Stack
                                direction='row'
                                spacing={isMobile ? 1.5 : 2} 
                                alignItems='center'
                                mb={isMobile ? 1.5 : 2} 
                            >
                                <Box
                                    sx={{
                                        p: isMobile ? 1 : 1.5, 
                                        borderRadius: 3,
                                        bgcolor: 'white',
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)',
                                        animation: `${pulseAnimation} 2s ease-in-out infinite`,
                                        flexShrink: 0,
                                    }}
                                >
                                    <TrendingUpIcon sx={{ 
                                        color: "#2563eb", 
                                        fontSize: isMobile ? 24 : 28 
                                    }} /> 
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                        variant={isMobile ? "subtitle1" : "h6"} 
                                        fontWeight={700}
                                        sx={{ 
                                            color: '#1e293b', 
                                            mb: 1,
                                            fontSize: isMobile ? '1rem' : '1.25rem'
                                        }} 
                                    >
                                        Ваш прогресс по категориям
                                    </Typography>
                                    <Typography
                                        variant='body2' 
                                        color='text.secondary'
                                        sx={{ 
                                            maxWidth: 500, 
                                            lineHeight: 1.5,
                                            fontSize: isMobile ? '0.85rem' : '1rem'
                                        }} 
                                    >
                                        Вы изучили {viewedApprox} из {totalApps} приложений. 
                                        Продолжайте открывать новые приложения!
                                    </Typography>
                                </Box>
                            </Stack>

                            <Box sx={{ 
                                minWidth: isMobile ? 160 : 200, 
                                mt: isMobile ? 2 : 3 
                            }}> 
                                <LinearProgress
                                    variant='determinate'
                                    value={overallPercent}
                                    sx={{
                                        height: isMobile ? 10 : 12, 
                                        borderRadius: 999,
                                        bgcolor: "rgba(255,255,255,0.8)",
                                        border: '1px solid #e5e7eb',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: "#2563eb",
                                            borderRadius: 999,
                                            background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
                                        },
                                    }}
                                />
                                <Stack 
                                    direction="row" 
                                    justifyContent="space-between" 
                                    alignItems="center" 
                                    mt={1.5}
                                    sx={{ flexWrap: isMobile ? 'wrap' : 'nowrap' }}
                                >
                                    <Typography
                                        variant='body2' 
                                        fontWeight={600}
                                        color='text.primary'
                                        sx={{
                                            fontSize: isMobile ? '0.8rem' : '0.875rem',
                                            mb: isMobile ? 0.5 : 0
                                        }}
                                    >
                                        Общий прогресс: {Math.round(overallPercent)}%
                                    </Typography>
                                    <Chip
                                        size={isMobile ? "small" : "medium"} 
                                        label={getAchievementLevel(overallPercent).text}
                                        icon={<span style={{ 
                                            fontSize: isMobile ? '12px' : '14px' 
                                        }}>{getAchievementLevel(overallPercent).icon}</span>}
                                        sx={{
                                            bgcolor: getAchievementLevel(overallPercent).color,
                                            color: 'white',
                                            fontSize: isMobile ? '0.7rem' : '0.8rem', 
                                            height: isMobile ? 20 : 24, 
                                            fontWeight: 600,
                                        }}
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>

                    {topCategories.length > 0 && (
                        <Box mt={isMobile ? 2 : 3} position="relative" zIndex={1}> 
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}> 
                                <EmojiEventsIcon sx={{ 
                                    color: "#f59e0b", 
                                    fontSize: isMobile ? 16 : 20 
                                }} />
                                <Typography
                                    variant='body2' 
                                    fontWeight={600}
                                    color='text.primary'
                                    sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                                >
                                    Ваши топ-категории:
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={1} 
                                flexWrap='wrap'>
                                {topCategories.map((cat, index) => (
                                    <Chip
                                        key={cat}
                                        size={isMobile ? "small" : "medium"} 
                                        label={cat}
                                        icon={<span style={{ 
                                            fontSize: isMobile ? '12px' : '14px' 
                                        }}>{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>}
                                        sx={{
                                            borderRadius: 2,
                                            bgcolor: "white",
                                            border: `2px solid ${index === 0 ? "#f59e0b" : index === 1 ? "#94a3b8" : "#f97316"}`,
                                            fontSize: isMobile ? '0.7rem' : '0.8rem', 
                                            fontWeight: 600,
                                            height: isMobile ? 28 : 32, 
                                            mb: 0.5,
                                            '&:hover': {
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Paper>

                <Stack spacing={isMobile ? 1.5 : 2}>
                    {categories.map(cat => {
                        const stats = getCategoryStats(cat);
                        const { dot, bg } = getCategoryColors(cat);
                        const topApp = findTopAppInCategory(cat);
                        const achievement = getAchievementLevel(stats.percent);

                        return (
                            <Paper
                                key={cat}
                                elevation={0}
                                onClick={() => handleCategorySelect(cat)}
                                sx={{
                                    p: isMobile ? 1.5 : 2.5,
                                    borderRadius: 3,
                                    bgcolor: "#ffffff",
                                    border: "1px solid #e5e7eb",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: "#f9fafb",
                                        boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
                                        borderColor: dot,
                                        transform: "translateY(-3px)",
                                    },
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: isMobile ? 60 : 80,
                                        height: isMobile ? 60 : 80,
                                        bgcolor: `${dot}10`,
                                        borderRadius: '0 0 0 80px',
                                    }}
                                />
                                
                                {isMobile ? (
                                    <Stack spacing={1.5}>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: "12px",
                                                    bgcolor: bg,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: `2px solid ${dot}40`,
                                                    animation: `${floatAnimation} 3s ease-in-out infinite`,
                                                    flexShrink: 0,
                                                }}>
                                                {getCategoryIcon(cat)}
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight={700}
                                                        noWrap
                                                        sx={{ 
                                                            color: '#1e293b',
                                                            fontSize: '0.95rem'
                                                        }}
                                                    >
                                                        {cat === "Все" ? "Все приложения" : cat}
                                                    </Typography>
                                                    <Chip
                                                        label={achievement.text}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: achievement.color,
                                                            color: 'white',
                                                            fontSize: '0.55rem',
                                                            height: 16,
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </Stack>
                                            </Box>
                                        </Stack>

                                        <Box>
                                            <LinearProgress
                                                variant='determinate'
                                                value={stats.percent}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 999,
                                                    bgcolor: "#f1f5f9",
                                                    border: '1px solid #e5e7eb',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: dot,
                                                        borderRadius: 999,
                                                        background: `linear-gradient(90deg, ${dot} 0%, ${dot}99 100%)`,
                                                    },
                                                }}
                                            />
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'
                                                    sx={{ fontSize: 11 }}
                                                >
                                                    Изучено {stats.viewed} из {stats.total || 0}
                                                </Typography>
                                                <Typography
                                                    variant='caption'
                                                    fontWeight={600}
                                                    color={dot}
                                                    sx={{ fontSize: 11 }}
                                                >
                                                    {Math.round(stats.percent)}%
                                                </Typography>
                                            </Stack>
                                        </Box>

                                        <Stack 
                                            direction="row" 
                                            spacing={1} 
                                            alignItems="center" 
                                            justifyContent="space-between"
                                            sx={{ 
                                                borderTop: '1px solid #f1f5f9',
                                                pt: 1,
                                                mt: 0.5
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                {renderTopAppPreview(topApp)}
                                            </Box>
                                            <ChevronRightIcon 
                                                sx={{ 
                                                    color: "#9ca3af",
                                                    transition: 'transform 0.2s ease',
                                                    fontSize: 20,
                                                    flexShrink: 0,
                                                    '.MuiPaper:hover &': {
                                                        transform: 'translateX(3px)',
                                                        color: dot,
                                                    }
                                                }} 
                                            />
                                        </Stack>
                                    </Stack>
                                ) : (
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center">
                                        <Stack
                                            direction='row'
                                            spacing={1.5}
                                            alignItems='center'
                                            sx={{ flex: 1, minWidth: 0 }}>
                                            <Box
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: "14px",
                                                    bgcolor: bg,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: `2px solid ${dot}40`,
                                                    animation: `${floatAnimation} 3s ease-in-out infinite`,
                                                }}>
                                                {getCategoryIcon(cat)}
                                            </Box>

                                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                                    <Typography
                                                        variant='subtitle1'
                                                        fontWeight={700}
                                                        noWrap
                                                        sx={{ color: '#1e293b' }}
                                                    >
                                                        {cat === "Все" ? "Все приложения" : cat}
                                                    </Typography>
                                                    <Chip
                                                        label={achievement.text}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: achievement.color,
                                                            color: 'white',
                                                            fontSize: '0.6rem',
                                                            height: 18,
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </Stack>
                                                
                                                <Typography
                                                    variant='body2'
                                                    color='text.secondary'
                                                    sx={{ fontSize: 12, mb: 1.5 }}
                                                >
                                                    {cat === "Все"
                                                        ? `Всего в витрине: ${stats.total}`
                                                        : `Приложений в категории: ${stats.total}`}
                                                </Typography>

                                                <Box>
                                                    <LinearProgress
                                                        variant='determinate'
                                                        value={stats.percent}
                                                        sx={{
                                                            height: 8,
                                                            borderRadius: 999,
                                                            bgcolor: "#f1f5f9",
                                                            border: '1px solid #e5e7eb',
                                                            '& .MuiLinearProgress-bar': {
                                                                bgcolor: dot,
                                                                borderRadius: 999,
                                                                background: `linear-gradient(90deg, ${dot} 0%, ${dot}99 100%)`,
                                                            },
                                                        }}
                                                    />
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                                                        <Typography
                                                            variant='caption'
                                                            color='text.secondary'
                                                        >
                                                            Изучено {stats.viewed} из {stats.total || 0}
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            fontWeight={600}
                                                            color={dot}
                                                        >
                                                            {Math.round(stats.percent)}%
                                                        </Typography>
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </Stack>

                                        <Stack
                                            direction='row'
                                            spacing={1.5}
                                            alignItems='center'
                                            sx={{ position: 'relative', zIndex: 1 }}
                                        >
                                            {renderTopAppPreview(topApp)}
                                            <ChevronRightIcon 
                                                sx={{ 
                                                    color: "#9ca3af",
                                                    transition: 'transform 0.2s ease',
                                                    '.MuiPaper:hover &': {
                                                        transform: 'translateX(3px)',
                                                        color: dot,
                                                    }
                                                }} 
                                            />
                                        </Stack>
                                    </Stack>
                                )}
                            </Paper>
                        );
                    })}
                </Stack>
            </Box>
        </PageWrapper>
    );
};

export default CategoriesScreen;