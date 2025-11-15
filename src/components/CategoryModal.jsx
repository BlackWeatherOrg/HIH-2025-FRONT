import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Stack,
    Avatar,
    Chip,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { keyframes } from "@emotion/react";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CategoryModal = ({
    open,
    onClose,
    category,
    apps,
    onOpenApp,
}) => {
    if (!category) return null;

    const categoryApps = apps.filter(app => app.category === category);
    
    const getCategoryColors = (cat) => {
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

    const { dot, bg, emoji } = getCategoryColors(category);

    const popularApps = [...categoryApps]
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 6);

    const newApps = categoryApps
        .filter(a => {
            const created = new Date(a.createdAt);
            const now = new Date();
            const diffDays = (now - created) / (1000 * 60 * 60 * 24);
            return diffDays <= 30;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    const editorsChoice = categoryApps.filter(a => a.editorsChoice).slice(0, 6);

    const AppCard = ({ app }) => (
        <Paper
            elevation={0}
            onClick={() => {
                onOpenApp(app);
                onClose();
            }}
            sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animation: `${fadeUp} 0.4s ease-out`,
                "&:hover": {
                    bgcolor: "#f9fafb",
                    boxShadow: "0 8px 25px rgba(15,23,42,0.1)",
                    borderColor: dot,
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Stack spacing={1.5} alignItems="center">
                <Avatar
                    sx={{
                        width: 50,
                        height: 50,
                        fontSize: 20,
                        fontWeight: 700,
                        bgcolor: app.accentColor || dot,
                        animation: `${pulseAnimation} 2s ease-in-out infinite`,
                    }}
                >
                    {app.name[0]}
                </Avatar>
                
                <Box textAlign="center" sx={{ minWidth: 0, width: '100%' }}>
                    <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        noWrap
                        sx={{ color: '#1e293b' }}
                    >
                        {app.name}
                    </Typography>
                    
                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" mt={0.5}>
                        <StarIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem" }}
                        >
                            {app.rating?.toFixed(1) || "—"}
                        </Typography>
                    </Stack>
                </Box>

                {app.editorsChoice && (
                    <Chip
                        label="Выбор редакции"
                        size="small"
                        sx={{
                            bgcolor: "#fef3c7",
                            color: "#92400e",
                            fontSize: '0.6rem',
                            height: 20,
                            fontWeight: 600,
                        }}
                    />
                )}
            </Stack>
        </Paper>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    minHeight: '60vh',
                    maxHeight: '85vh',
                }
            }}
        >
            <DialogTitle
                sx={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
                    borderBottom: '1px solid #e0f2fe',
                    position: 'relative',
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "16px",
                            bgcolor: bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${dot}40`,
                            fontSize: '24px',
                        }}
                    >
                        {emoji}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight={700} sx={{ color: '#1e293b' }}>
                            {category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {categoryApps.length} приложений в категории
                        </Typography>
                    </Box>
                    
                    <IconButton
                        onClick={onClose}
                        sx={{
                            bgcolor: 'white',
                            border: '1px solid #e5e7eb',
                            '&:hover': {
                                bgcolor: '#f8fafc',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                    {popularApps.length > 0 && (
                        <Box>
                            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#1e293b' }}>
                                🔥 Популярные в {category}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {popularApps.map(app => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {newApps.length > 0 && (
                        <Box>
                            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#1e293b' }}>
                                🆕 Новинки в {category}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {newApps.map(app => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {editorsChoice.length > 0 && (
                        <Box>
                            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#1e293b' }}>
                                ⭐ Выбор редакции в {category}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {editorsChoice.map(app => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </Box>
                        </Box>
                    )}


                    {categoryApps.length > 0 && (
                        <Box>
                            <Typography variant="h6" fontWeight={600} mb={2} sx={{ color: '#1e293b' }}>
                                📱 Все приложения в {category}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(2, 1fr)',
                                        sm: 'repeat(3, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {categoryApps.map(app => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </Box>
                        </Box>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryModal;