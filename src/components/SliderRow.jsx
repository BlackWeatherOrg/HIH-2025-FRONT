import React, { useState, useMemo } from "react";
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

    const maxIndex = Math.max(0, items.length - visibleCount);
    const canPrev = index > 0;
    const canNext = index < maxIndex;

    const visibleItems = items.slice(index, index + visibleCount);

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
                    onClick={() => setIndex(i => Math.max(0, i - 1))}
                    disabled={!canPrev}
                    sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        "&:disabled": {
                            opacity: 0.4,
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
                    }}>
                    {visibleItems.map(item => (
                        <Box key={item.id}>{renderItem(item)}</Box>
                    ))}
                </Box>

                <IconButton
                    size='small'
                    onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
                    disabled={!canNext}
                    sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        "&:disabled": {
                            opacity: 0.4,
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
                    mt={1}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: i === index ? 18 : 6,
                                height: 6,
                                borderRadius: 999,
                                bgcolor: i === index ? "#2563eb" : "#e5e7eb",
                                transition: "all 0.2s",
                            }}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default SliderRow;