import React from "react";
import { Box, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";
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
    let list = apps;

    if (selectedCategory && selectedCategory !== "Все") {
        list = list.filter(a => a.category === selectedCategory);
    }

    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        list = list.filter(a => a.name.toLowerCase().includes(q));
    }

    list = [...list].sort((a, b) => {
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
            const created = new Date(a.createdAt);
            const now = new Date();
            const diffDays = (now - created) / (1000 * 60 * 60 * 24);
            return diffDays <= 60;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    const editorsChoice = apps.filter(a => a.editorsChoice).slice(0, 8);

    return (
        <PageWrapper>
            <MainAppBar onOpenCategories={onOpenCategories} />

            <Box sx={{ 
                mt: 2, 
                animation: `${fadeUp} 0.5s ease-out` 
            }}>
                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.1s both` }}>
                    <DailyRecommendationSection
                        dailyRecommendation={dailyRecommendation}
                        onOpenApp={onOpenApp}
                    />
                </Box>

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.2s both` }}>
                    <AchievementsSection achievements={achievements} />
                </Box>

                {recentlyViewedApps && recentlyViewedApps.length > 0 && (
                    <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.3s both` }}>
                        <AppsSliderBlock
                            title='Вы недавно смотрели'
                            items={recentlyViewedApps}
                            onOpenApp={onOpenApp}
                            variant='plain'
                        />
                    </Box>
                )}

                {recommendedApps && recommendedApps.length > 0 && (
                    <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.4s both` }}>
                        <AppsSliderBlock
                            title='Рекомендации для вас'
                            items={recommendedApps}
                            onOpenApp={onOpenApp}
                            variant='subtle'
                        />
                    </Box>
                )}

                <Stack spacing={2.5} mb={3}>
                    {popularApps.length > 0 && (
                        <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.5s both` }}>
                            <AppsSliderBlock
                                title='Популярные приложения'
                                iconType='hot'
                                items={popularApps}
                                onOpenApp={onOpenApp}
                                variant='plain'
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

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.8s both` }}>
                    <SearchAndSortBar
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        sortBy={sortBy}
                        onSortChange={onSortChange}
                    />

                    <CategoriesChipsRow
                        selectedCategory={selectedCategory}
                        onSelectCategory={onSelectCategory}
                    />
                </Box>

                <Box sx={{ animation: `${fadeUp} 0.6s ease-out 0.9s both` }}>
                    <AllAppsSection
                        list={list}
                        isLoading={isLoading}
                        onOpenApp={onOpenApp}
                    />
                </Box>
            </Box>
        </PageWrapper>
    );
};

export default MainScreen;