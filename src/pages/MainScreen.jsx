import React, { useEffect, useState } from "react";
import { Box, Stack, Fab } from "@mui/material";
import { keyframes } from "@emotion/react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import PageWrapper from "components/PageWrapper";
import MainAppBar from "components/mainscreen/Mainbar";
import DailyRecommendationSection from "components/mainscreen/DailyRecommendationSection";
import AchievementsSection from "components/mainscreen/AchievementsSection";
import AppsSliderBlock from "components/mainscreen/AppsSliderBlock";
import SearchAndSortBar from "components/mainscreen/SearchAndSortBar";
import CategoriesChipsRow from "components/mainscreen/CategoriesChipsRow";
import AllAppsSection from "components/mainscreen/AllAppsSection";
const fadeUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const MainScreen = ({
    apps, 
    list, 
    categories, 
    selectedCategory,
    onSelectCategory,
    onOpenCategories,
    onOpenApp,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    isLoading,
    recentlyViewedApps,
    recommendedApps,
    dailyRecommendation,
    achievements,
}) => {
    let listToShow = Array.isArray(list) ? [...list] : [];
    listToShow.sort((a, b) => {
        if (sortBy === "popularity") {
            return (b.popularity || 0) - (a.popularity || 0);
        }
        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
    });

    const popularApps = [...apps]
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 8);

    const newApps = apps
        .filter(a => {
            if (!a.createdAt) return false;
            const created = new Date(a.createdAt);
            const now = new Date();
            const diffDays = (now - created) / (1000 * 60 * 60 * 24);
            return diffDays <= 60;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    const editorsChoice = apps.filter(a => a.editorsChoice).slice(0, 8);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <PageWrapper>
            <MainAppBar onOpenCategories={onOpenCategories} />

            <Box
                sx={{
                    mt: 2,
                    animation: `${fadeUp} 0.5s ease-out`,
                }}>
                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.1s both`, mb: 2.5 }}>
                    <DailyRecommendationSection
                        dailyRecommendation={dailyRecommendation}
                        onOpenApp={onOpenApp}
                    />
                </Box>

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.2s both`, mb: 2.5 }}>
                    <AchievementsSection achievements={achievements} />
                </Box>

                {recentlyViewedApps && recentlyViewedApps.length > 0 && (
                    <Box
                        sx={{
                            animation: `${fadeUp} 0.6s ease-out 0.3s both`,
                            mb: 2.5, 
                        }}>
                        <AppsSliderBlock
                            title='Вы недавно смотрели'
                            items={recentlyViewedApps}
                            onOpenApp={onOpenApp}
                            variant='plain'
                        />
                    </Box>
                )}

                {recommendedApps && recommendedApps.length > 0 && (
                    <Box
                        sx={{
                            animation: `${fadeUp} 0.6s ease-out 0.4s both`,
                            mb: 3,
                        }}>
                        <AppsSliderBlock
                            title='Рекомендации для вас'
                            items={recommendedApps}
                            onOpenApp={onOpenApp}
                            variant='subtle'
                        />
                    </Box>
                )}

                <Stack
                    spacing={2.5}
                    mb={3}>
                    {popularApps.length > 0 && (
                        <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.5s both` }}>
                            <AppsSliderBlock
                                title='Популярные приложения'
                                iconType='hot'
                                items={popularApps}
                                onOpenApp={onOpenApp}
                                variant='plain'
                                autoPlay
                                autoPlayInterval={9000}
                            />
                        </Box>
                    )}

                    {newApps.length > 0 && (
                        <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.6s both` }}>
                            <AppsSliderBlock
                                title='Новинки'
                                iconType='new'
                                items={newApps}
                                onOpenApp={onOpenApp}
                                variant='plain'
                                autoPlay
                                autoPlayInterval={11000}
                            />
                        </Box>
                    )}

                    {editorsChoice.length > 0 && (
                        <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.7s both` }}>
                            <AppsSliderBlock
                                title='Выбор редакции'
                                iconType='editors'
                                items={editorsChoice}
                                onOpenApp={onOpenApp}
                                variant='plain'
                            />
                        </Box>
                    )}
                </Stack>

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.8s both`, mb: 1.5 }}>
                    <SearchAndSortBar
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        sortBy={sortBy}
                        onSortChange={onSortChange}
                    />

                    <CategoriesChipsRow
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                </Box>

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.9s both` }}>
                    <AllAppsSection
                        list={listToShow}
                        isLoading={isLoading}
                        onOpenApp={onOpenApp}
                    />
                </Box>
            </Box>

            {showScrollTop && (
                <Fab
                    color='primary'
                    size='medium'
                    onClick={scrollToTop}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1300,
                        boxShadow: "0 10px 30px rgba(15,23,42,0.3)",
                    }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </PageWrapper>
    );
};

export default MainScreen;