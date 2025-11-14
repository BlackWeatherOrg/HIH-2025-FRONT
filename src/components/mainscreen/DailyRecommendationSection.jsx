import React from "react";
import { Paper, Stack, Box, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { keyframes } from "@emotion/react";
import AppCard from "components/AppCard";

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.35); }
  70% { box-shadow: 0 0 0 14px rgba(248, 113, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0); }
`;

const floatCard = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

const DailyRecommendationSection = ({ dailyRecommendation, onOpenApp }) => {
    if (!dailyRecommendation) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                mb: 3,
                p: { xs: 2.5, md: 3 },
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #fee2e2",
                bgcolor: "linear-gradient(135deg, #fef3c7, #fee2e2)",
                backgroundImage:
                    "radial-gradient(circle at 0 0, rgba(248,113,113,0.25), transparent 55%), radial-gradient(circle at 100% 100%, rgba(251,191,36,0.35), transparent 55%)",
            }}>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.4,
                    background:
                        "radial-gradient(circle at 20% 0, rgba(255,255,255,0.6), transparent 55%)",
                }}
            />

            <Stack
                spacing={2}
                alignItems='center'
                sx={{ position: "relative", zIndex: 1 }}>
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    justifyContent='center'>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "999px",
                            bgcolor: "#f97316",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            animation: `${pulseGlow} 1.8s ease-out infinite`,
                        }}>
                        <WhatshotIcon sx={{ color: "#fffbeb", fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant='subtitle2'
                            sx={{ textTransform: "uppercase", fontWeight: 700 }}
                            color='#b45309'>
                            Ежедневная рекомендация
                        </Typography>
                        <Typography
                            variant='body2'
                            color='#7c2d12'>
                            Подборка дня специально для вас
                        </Typography>
                    </Box>
                </Stack>

                <Typography
                    variant='body2'
                    color='#7c2d12'
                    textAlign='center'
                    sx={{ maxWidth: 480 }}>
                    {dailyRecommendation.funFact}
                </Typography>

                <Box
                    sx={{
                        maxWidth: 420,
                        width: "100%",
                        animation: `${floatCard} 3s ease-in-out infinite`,
                    }}>
                    <AppCard
                        app={dailyRecommendation}
                        onClick={() => onOpenApp(dailyRecommendation)}
                    />
                </Box>
            </Stack>
        </Paper>
    );
};

export default DailyRecommendationSection;