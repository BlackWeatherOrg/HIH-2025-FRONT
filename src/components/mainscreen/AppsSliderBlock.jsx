import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AppCard from "components/AppCard";
const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(16px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const dotPulse = keyframes`
  0%   { transform: scale(1); opacity: 0.7; }
  50%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const AppsSliderBlock = ({
    title,
    iconType,
    items = [],
    onOpenApp,
    variant = "plain",
    autoPlay = false,
    autoPlayInterval = 8000,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const [index, setIndex] = useState(0);
    const visibleCount = useMemo(() => {
        if (items.length === 0) return 0;
        const target = isMobile ? 1 : isTablet ? 2 : 3;
        return Math.min(target, items.length);
    }, [items.length, isMobile, isTablet]);

    const canSlide = items.length > visibleCount;

    useEffect(() => {
        if (index >= items.length) {
            setIndex(0);
        }
    }, [items.length, index]);

    const visibleItems = useMemo(() => {
        if (items.length === 0 || visibleCount === 0) return [];
        const result = [];
        for (let i = 0; i < visibleCount; i += 1) {
            const idx = (index + i) % items.length;
            result.push(items[idx]);
        }
        return result;
    }, [items, index, visibleCount]);

    const handleNext = () => {
        if (!canSlide) return;
        setIndex(prev => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        if (!canSlide) return;
        setIndex(prev => (prev - 1 + items.length) % items.length);
    };

    useEffect(() => {
        if (!autoPlay || !canSlide) return;

        const id = setInterval(() => {
            setIndex(prev => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(id);
    }, [autoPlay, autoPlayInterval, canSlide, items.length]);

    const renderIcon = () => {
        if (iconType === "hot") {
            return <WhatshotIcon sx={{ color: "#ef4444", fontSize: 20 }} />;
        }
        if (iconType === "new") {
            return <StarIcon sx={{ color: "#f97316", fontSize: 20 }} />;
        }
        if (iconType === "editors") {
            return <WorkspacePremiumIcon sx={{ color: "#22c55e", fontSize: 20 }} />;
        }
        return null;
    };

    const isSubtle = variant === "subtle";

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: isSubtle ? "#f9fafb" : "#ffffff",
                border: "1px solid #e5e7eb",
            }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                spacing={1.5}
                mb={1.5}>
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'>
                    {renderIcon()}
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}>
                        {title}
                    </Typography>
                </Stack>

                <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'>
                    {canSlide && (
                        <>
                            <IconButton
                                size='small'
                                onClick={handlePrev}
                                sx={{
                                    borderRadius: 999,
                                    border: "1px solid #e5e7eb",
                                    bgcolor: "#ffffff",
                                    "&:hover": {
                                        bgcolor: "#f3f4f6",
                                    },
                                }}>
                                <ChevronLeftIcon fontSize='small' />
                            </IconButton>
                            <IconButton
                                size='small'
                                onClick={handleNext}
                                sx={{
                                    borderRadius: 999,
                                    border: "1px solid #e5e7eb",
                                    bgcolor: "#ffffff",
                                    "&:hover": {
                                        bgcolor: "#f3f4f6",
                                    },
                                }}>
                                <ChevronRightIcon fontSize='small' />
                            </IconButton>
                        </>
                    )}
                </Stack>
            </Stack>

            <Box sx={{ overflow: "hidden" }}>
                <Stack
                    key={index}
                    direction='row'
                    spacing={2}
                    sx={{
                        animation: `${slideIn} 0.45s ease-out`,
                    }}>
                    {visibleItems.map(app => (
                        <Box
                            key={app.id}
                            sx={{
                                flex: 1,
                                minWidth: isMobile ? "100%" : 0,
                            }}>
                            <AppCard
                                app={app}
                                onClick={() => onOpenApp(app)}
                            />
                        </Box>
                    ))}
                </Stack>
            </Box>

            {canSlide && (
                <Stack
                    direction='row'
                    spacing={0.7}
                    justifyContent='center'
                    mt={1.5}>
                    {items.map((_, i) => {
                        const isActive = i === index;
                        return (
                            <Box
                                key={i}
                                sx={{
                                    width: isActive ? 10 : 6,
                                    height: 6,
                                    borderRadius: 999,
                                    bgcolor: isActive ? "#2563eb" : "#d1d5db",
                                    opacity: isActive ? 1 : 0.7,
                                    animation: isActive
                                        ? `${dotPulse} 1.4s ease-in-out infinite`
                                        : "none",
                                    transition: "all 0.25s ease",
                                }}
                            />
                        );
                    })}
                </Stack>
            )}
        </Box>
    );
};

export default AppsSliderBlock;