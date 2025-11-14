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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import { keyframes } from "@emotion/react";
import PageWrapper from "../components/PageWrapper";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const CategoriesScreen = ({ categories, onBack, onSelectCategory, apps, viewsByCategory }) => {
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
                return { dot: "#16a34a", bg: "#dcfce7" };
            case "Игры":
                return { dot: "#8b5cf6", bg: "#ede9fe" };
            case "Государственные":
                return { dot: "#2563eb", bg: "#dbeafe" };
            case "Транспорт":
                return { dot: "#f97316", bg: "#ffedd5" };
            case "Инструменты":
                return { dot: "#4b5563", bg: "#e5e7eb" };
            default:
                return { dot: "#4f46e5", bg: "#e0e7ff" };
        }
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
        if (!app) return null;
        return (
            <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(148,163,184,0.4)",
                    minWidth: 0,
                }}>
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        fontSize: 16,
                        fontWeight: 600,
                        bgcolor: app.accentColor || "#2563eb",
                    }}>
                    {app.name[0]}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant='body2'
                        fontWeight={600}
                        noWrap>
                        {app.name}
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'>
                        <StarIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                        <Typography
                            variant='caption'
                            color='text.secondary'>
                            {app.rating?.toFixed(1) || "—"}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        );
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
                        onClick={onBack}>
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography
                        variant='h6'
                        sx={{ fontWeight: 600 }}>
                        Категории
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    mt: 2.5,
                    animation: `${fadeUp} 0.3s ease-out`,
                }}>

                <Paper
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: 2.3,
                        borderRadius: 3,
                        bgcolor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                    }}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ xs: "flex-start", sm: "center" }}>
                        <Box sx={{ flex: 1 }}>
                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'
                                mb={0.5}>
                                <CategoryIcon sx={{ color: "#2563eb" }} />
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={600}>
                                    Ваш прогресс по категориям
                                </Typography>
                            </Stack>
                            <Typography
                                variant='body2'
                                color='text.secondary'>
                                Вы посмотрели примерно {viewedApprox} из {totalApps} приложений.
                                Продолжайте, чтобы открыть больше достижений и рекомендаций.
                            </Typography>
                        </Box>

                        <Box sx={{ minWidth: 180 }}>
                            <LinearProgress
                                variant='determinate'
                                value={overallPercent}
                                sx={{
                                    height: 8,
                                    borderRadius: 999,
                                    bgcolor: "#e5e7eb",
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: "#2563eb",
                                    },
                                }}
                            />
                            <Typography
                                variant='caption'
                                color='text.secondary'>
                                Общий прогресс: {Math.round(overallPercent)}%
                            </Typography>
                        </Box>
                    </Stack>

                    {topCategories.length > 0 && (
                        <Box mt={2}>
                            <Typography
                                variant='caption'
                                color='text.secondary'>
                                Ваши топ-категории:
                            </Typography>
                            <Stack
                                direction='row'
                                spacing={1}
                                mt={1}
                                flexWrap='wrap'>
                                {topCategories.map(cat => (
                                    <Chip
                                        key={cat}
                                        size='small'
                                        label={cat}
                                        sx={{
                                            borderRadius: 999,
                                            bgcolor: "#e0ecff",
                                            border: "1px solid #bfdbfe",
                                            fontSize: 11,
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Paper>

                <Stack spacing={2}>
                    {categories.map(cat => {
                        const stats = getCategoryStats(cat);
                        const { dot, bg } = getCategoryColors(cat);
                        const topApp = findTopAppInCategory(cat);

                        return (
                            <Paper
                                key={cat}
                                elevation={0}
                                onClick={() => onSelectCategory(cat === "Все" ? null : cat)}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor: "#ffffff",
                                    border: "1px solid #e5e7eb",
                                    cursor: "pointer",
                                    transition:
                                        "background-color 0.15s ease, box-shadow 0.15s ease, border 0.15s ease, transform 0.15s ease",
                                    "&:hover": {
                                        bgcolor: "#f9fafb",
                                        boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
                                        borderColor: "rgba(37,99,235,0.35)",
                                        transform: "translateY(-2px)",
                                    },
                                }}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2}
                                    alignItems={{ xs: "flex-start", sm: "center" }}>
                                    <Stack
                                        direction='row'
                                        spacing={1.5}
                                        alignItems='center'
                                        sx={{ flex: 1, minWidth: 0 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: "999px",
                                                bgcolor: bg,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                            <CategoryIcon sx={{ color: dot }} />
                                        </Box>

                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography
                                                variant='subtitle1'
                                                fontWeight={600}
                                                noWrap>
                                                {cat === "Все" ? "Все приложения" : cat}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ fontSize: 12 }}>
                                                {cat === "Все"
                                                    ? `Всего в витрине: ${stats.total}`
                                                    : `Приложений в категории: ${stats.total}`}
                                            </Typography>

                                            <Box mt={1}>
                                                <LinearProgress
                                                    variant='determinate'
                                                    value={stats.percent}
                                                    sx={{
                                                        height: 6,
                                                        borderRadius: 999,
                                                        bgcolor: "#e5e7eb",
                                                        "& .MuiLinearProgress-bar": {
                                                            bgcolor: dot,
                                                        },
                                                    }}
                                                />
                                                <Typography
                                                    variant='caption'
                                                    color='text.secondary'>
                                                    Изучено {stats.viewed} из {stats.total || 0} (
                                                    {Math.round(stats.percent)}%)
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Stack>

                                    <Stack
                                        direction='row'
                                        spacing={1.5}
                                        alignItems='center'>
                                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                                            {renderTopAppPreview(topApp)}
                                        </Box>
                                        <ChevronRightIcon sx={{ color: "#9ca3af" }} />
                                    </Stack>
                                </Stack>
                            </Paper>
                        );
                    })}
                </Stack>
            </Box>
        </PageWrapper>
    );
};

export default CategoriesScreen;