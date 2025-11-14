import React from "react";
import { Paper, Stack, Box, Typography, LinearProgress } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const achievementColors = [
    { light: "#fef2f2", border: "#fee2e2" },
    { light: "#eff6ff", border: "#dbeafe" },
    { light: "#ecfdf5", border: "#bbf7d0" },
];

const AchievementsSection = ({ achievements }) => {
    if (!achievements || achievements.length === 0) return null;

    const renderAchievementCard = (ach, index) => {
        const unlocked = ach.unlocked;
        const percent = Math.round((ach.progress || 0) * 100);
        const palette = achievementColors[index % achievementColors.length];

        return (
            <Paper
                key={ach.id}
                elevation={0}
                sx={{
                    flex: 1,
                    minWidth: 220,
                    p: 1.8,
                    borderRadius: 3,
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid ${palette.border}`,
                    bgcolor: unlocked ? "#fffbeb" : palette.light,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.1,
                }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background:
                            "radial-gradient(circle at 0 0, rgba(255,255,255,0.85), transparent 55%)",
                        opacity: 0.6,
                    }}
                />

                <Stack
                    direction='row'
                    spacing={1.5}
                    alignItems='center'
                    sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "999px",
                            bgcolor: unlocked ? "#facc15" : "#e5e7eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <EmojiEventsIcon
                            fontSize='small'
                            sx={{ color: unlocked ? "#854d0e" : "#6b7280" }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant='body2'
                            fontWeight={600}
                            sx={{ lineHeight: 1.3 }}>
                            {ach.title}
                        </Typography>
                        <Typography
                            variant='caption'
                            color='text.secondary'>
                            {unlocked ? "Достижение открыто" : `Прогресс: ${percent}%`}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            px: 1,
                            py: 0.3,
                            borderRadius: 999,
                            fontSize: 10,
                            fontWeight: 600,
                            bgcolor: unlocked ? "#facc15" : "#e5e7eb",
                            color: unlocked ? "#78350f" : "#4b5563",
                        }}>
                        {unlocked ? "Готово" : "В процессе"}
                    </Box>
                </Stack>

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <LinearProgress
                        variant='determinate'
                        value={percent}
                        sx={{
                            height: 6,
                            borderRadius: 999,
                            bgcolor: "rgba(255,255,255,0.7)",
                            "& .MuiLinearProgress-bar": {
                                bgcolor: unlocked ? "#facc15" : "#60a5fa",
                            },
                        }}
                    />
                </Box>
            </Paper>
        );
    };

    return (
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
                direction='row'
                spacing={1}
                alignItems='center'
                mb={1.5}>
                <EmojiEventsIcon sx={{ color: "#f59e0b" }} />
                <Box>
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}>
                        Ваши достижения
                    </Typography>
                    <Typography
                        variant='caption'
                        color='text.secondary'>
                        Открывайте бейджи, изучая приложения и категории
                    </Typography>
                </Box>
            </Stack>

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1.5}>
                {achievements.map((ach, index) => renderAchievementCard(ach, index))}
            </Stack>
        </Paper>
    );
};

export default AchievementsSection;