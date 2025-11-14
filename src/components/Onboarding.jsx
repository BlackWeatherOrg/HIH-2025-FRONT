import React, { useState } from "react";
import { Box, Button, Typography, Stack, useMediaQuery, Paper } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { keyframes } from "@emotion/react";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
`;

const Onboarding = ({ onFinish }) => {
    const [step, setStep] = useState(0);
    const isMobile = useMediaQuery("(max-width:600px)");

    const steps = [
        {
            title: "Добро пожаловать в RuStore",
            text: "Откройте для себя мир российских приложений: игры, финансы, сервисы и многое другое.",
        },
        {
            title: "Интерактивная витрина",
            text: "Смотрите подборки, рейтинги и рекомендации, чтобы быстрее находить полезные приложения.",
        },
        {
            title: "Удобная навигация",
            text: "Фильтруйте по категориям, изучайте карточки и устанавливайте новые приложения в один клик.",
        },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) setStep(s => s + 1);
        else onFinish();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}>
            <Paper
                elevation={4}
                sx={{
                    maxWidth: 480,
                    width: "100%",
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "#ffffff",
                    animation: `${scaleIn} 0.35s ease-out`,
                }}>
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Box
                        component='img'
                        src='https://static.rustore.ru/rustore-strapi/6/logo_color_30_px_2_fa2039288f.svg'
                        alt='RuStore'
                        sx={{
                            width: isMobile ? 120 : 160,
                            height: "auto",
                            filter: "drop-shadow(0 14px 30px rgba(15,23,42,0.18))",
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        animation: `${fadeUp} 0.4s ease-out`,
                    }}>
                    <Typography
                        variant='body1'
                        color='text.secondary'>
                        {steps[step].title}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        mb: 4,
                        p: 2.5,
                        borderRadius: 3,
                        bgcolor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        animation: `${fadeUp} 0.5s ease-out`,
                    }}>
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        mb={1.5}>
                        Шаг {step + 1} из {steps.length}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'>
                        {steps[step].text}
                    </Typography>

                    <Box
                        mt={3}
                        display='flex'
                        justifyContent='center'
                        gap={1}>
                        {steps.map((_, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: idx === step ? 26 : 8,
                                    height: 8,
                                    borderRadius: 999,
                                    bgcolor: idx === step ? "#2563eb" : "#e5e7eb",
                                    transition: "all 0.25s",
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Stack
                    direction='row'
                    spacing={2}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={onFinish}
                        sx={{ borderRadius: 999 }}>
                        Пропустить
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        endIcon={<PlayArrowIcon />}
                        onClick={handleNext}
                        sx={{ borderRadius: 999 }}>
                        {step === steps.length - 1 ? "Начать" : "Далее"}
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Onboarding;