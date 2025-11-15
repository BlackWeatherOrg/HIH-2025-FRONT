import React, { useState, useMemo } from "react";
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SliderRow = ({ title, icon, items, renderItem }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const visibleCount = useMemo(() => {
        if (isXs) return 1;
        if (isSm) return 2;
        return 3;
    }, [isXs, isSm]);

    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const maxIndex = Math.max(0, items.length - visibleCount);
    const canPrev = index > 0;
    const canNext = index < maxIndex;

    const visibleItems = items.slice(index, index + visibleCount);

    const handlePrev = () => {
        if (canPrev && !isAnimating) {
            setIsAnimating(true);
            setIndex(i => Math.max(0, i - 1));
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    const handleNext = () => {
        if (canNext && !isAnimating) {
            setIsAnimating(true);
            setIndex(i => Math.min(maxIndex, i + 1));
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    const handleDotClick = (newIndex) => {
        if (!isAnimating && newIndex !== index) {
            setIsAnimating(true);
            setIndex(newIndex);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    if (!items || items.length === 0) return null;

    return (
        <Box>
            {title && (
                <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    mb={1.5}>
                    {icon}
                    <Typography
                        variant='subtitle1'
                        fontWeight={600}>
                        {title}
                    </Typography>
                </Stack>
            )}

            <Stack
                direction='row'
                alignItems='center'
                spacing={1}>
                <IconButton
                    size='small'
                    onClick={handlePrev}
                    disabled={!canPrev || isAnimating}
                    sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        "&:hover:not(:disabled)": {
                            bgcolor: "#f8fafc",
                            transform: "scale(1.1)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                        "&:disabled": {
                            opacity: 0.3,
                            cursor: "not-allowed",
                        },
                    }}>
                    <ChevronLeftIcon fontSize='small' />
                </IconButton>

                <Box
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
                        gap: 1.5,
                        minHeight: 120,
                    }}>
                    {visibleItems.map((item, itemIndex) => (
                        <Box 
                            key={item.id}
                            sx={{
                                animation: `${slideIn} 0.3s ease-out both`,
                                animationDelay: `${itemIndex * 0.1}s`,
                                transition: "transform 0.3s ease, opacity 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                }
                            }}
                        >
                            {renderItem(item)}
                        </Box>
                    ))}
                </Box>

                <IconButton
                    size='small'
                    onClick={handleNext}
                    disabled={!canNext || isAnimating}
                    sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        transition: "all 0.3s ease",
                        "&:hover:not(:disabled)": {
                            bgcolor: "#f8fafc",
                            transform: "scale(1.1)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                        "&:disabled": {
                            opacity: 0.3,
                            cursor: "not-allowed",
                        },
                    }}>
                    <ChevronRightIcon fontSize='small' />
                </IconButton>
            </Stack>

            {maxIndex > 0 && (
                <Stack
                    direction='row'
                    spacing={0.5}
                    justifyContent='center'
                    mt={1.5}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => handleDotClick(i)}
                            sx={{
                                width: i === index ? 20 : 6,
                                height: 6,
                                borderRadius: 999,
                                bgcolor: i === index ? "#2563eb" : "#e5e7eb",
                                cursor: !isAnimating ? "pointer" : "default",
                                opacity: isAnimating && i === index ? 0.7 : 1,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    bgcolor: !isAnimating ? (i === index ? "#1d4ed8" : "#d1d5db") : undefined,
                                    transform: !isAnimating ? "scale(1.2)" : undefined,
                                }
                            }}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default SliderRow;