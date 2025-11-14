import React from "react";
import { Box, Stack, Typography, Paper, Skeleton } from "@mui/material";
import { keyframes } from "@emotion/react";
import AppCard from "components/AppCard";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shakeSkeleton = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const renderSkeletonList = (count = 4) => (
    <Stack spacing={2}>
        {Array.from({ length: count }).map((_, idx) => (
            <Paper
                key={idx}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    animation: `${shakeSkeleton} 0.6s ease-in-out infinite`,
                }}>
                <Skeleton
                    variant='rounded'
                    width={54}
                    height={54}
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

const AllAppsSection = ({ list, isLoading, onOpenApp }) => {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography
                variant='subtitle1'
                fontWeight={600}
                mb={1.5}>
                Все приложения
            </Typography>

            {isLoading ? (
                renderSkeletonList()
            ) : (
                <Stack
                    spacing={2}
                    sx={{
                        animation: `${fadeUp} 0.45s ease-out`,
                    }}>
                    {list.map(app => (
                        <AppCard
                            key={app.id}
                            app={app}
                            onClick={() => onOpenApp(app)}
                        />
                    ))}
                    {list.length === 0 && (
                        <Typography
                            variant='body2'
                            color='text.secondary'>
                            Ничего не найдено по вашему запросу.
                        </Typography>
                    )}
                </Stack>
            )}
        </Box>
    );
};

export default AllAppsSection;