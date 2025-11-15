import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography, Paper, Skeleton } from "@mui/material";
import { keyframes } from "@emotion/react";
import AppCard from "components/AppCard";

const fadeUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(12px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const PAGE_SIZE = 10;

const AllAppsSection = ({ list = [], isLoading, onOpenApp }) => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const sentinelRef = useRef(null);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [list]);

    const itemsToRender = useMemo(() => list.slice(0, visibleCount), [list, visibleCount]);

    useEffect(() => {
        if (isLoading) return;
        if (!sentinelRef.current) return;
        if (list.length <= PAGE_SIZE) return;

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setVisibleCount(prev => (prev >= list.length ? prev : prev + PAGE_SIZE));
                }
            },
            {
                root: null,
                rootMargin: "0px 0px 200px 0px",
                threshold: 0.1,
            }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [list.length, isLoading]);

    const renderSkeletonList = (count = 6) => (
        <Stack spacing={2}>
            {Array.from({ length: count }).map((_, idx) => (
                <Paper
                    key={idx}
                    sx={{
                        p: 1.8,
                        borderRadius: 2,
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        gap: 1.6,
                        alignItems: "center",
                    }}>
                    <Skeleton
                        variant='rounded'
                        width={56}
                        height={56}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton
                            width='60%'
                            height={20}
                        />
                        <Skeleton
                            width='40%'
                            height={16}
                        />
                        <Skeleton
                            width='90%'
                            height={16}
                        />
                    </Box>
                </Paper>
            ))}
        </Stack>
    );

    return (
        <Box sx={{ mb: 6 }}>
            <Typography
                variant='subtitle1'
                fontWeight={600}
                mb={1.5}>
                Все приложения
            </Typography>

            <Box
                sx={{
                    minHeight: 320, //
                    animation: `${fadeUp} 0.4s ease-out`,
                }}>
                {isLoading ? (
                    renderSkeletonList()
                ) : itemsToRender.length > 0 ? (
                    <>
                        <Stack spacing={2}>
                            {itemsToRender.map(app => (
                                <AppCard
                                    key={app.id}
                                    app={app}
                                    onClick={() => onOpenApp(app)}
                                />
                            ))}
                        </Stack>
                        <Box
                            ref={sentinelRef}
                            sx={{ height: 1 }}
                        />
                    </>
                ) : (
                    <Typography
                        variant='body2'
                        color='text.secondary'>
                        Ничего не найдено по вашему запросу.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AllAppsSection;