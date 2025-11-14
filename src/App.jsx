import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ScreenshotGallery from "components/ScreenshotGallery";
import AppDetail from "pages/AppDetail";
import CategoriesScreen from "pages/CategoriesScreen";
import MainScreen from "pages/MainScreen";
import Onboarding from "components/Onboarding";
import { APPS, CATEGORIES } from "utils/mock";
import theme from "components/theme";

const STORAGE_KEYS = {
    onboarding: "rustore_onboarding_seen",
    recentViews: "rustore_recent_views",
    dailyRec: "rustore_daily_rec",
};

const getTodayStr = () => new Date().toISOString().slice(0, 10);

function App() {
    const [screen, setScreen] = useState("onboarding");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const [recentViewIds, setRecentViewIds] = useState([]);
    const [dailyRecommendation, setDailyRecommendation] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popularity");

    useEffect(() => {
        const seen = localStorage.getItem(STORAGE_KEYS.onboarding);
        if (seen) {
            setScreen("home");
        } else {
            setScreen("onboarding");
        }

        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.recentViews));
            if (Array.isArray(stored)) {
                setRecentViewIds(stored);
            }
        } catch {}

        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyRec));
            const today = getTodayStr();
            if (stored && stored.date === today) {
                const app = APPS.find(a => a.id === stored.appId);
                if (app) {
                    setDailyRecommendation(app);
                }
            } else {
                const randomApp = APPS[Math.floor(Math.random() * APPS.length)];
                setDailyRecommendation(randomApp);
                localStorage.setItem(
                    STORAGE_KEYS.dailyRec,
                    JSON.stringify({ date: today, appId: randomApp.id })
                );
            }
        } catch {}

        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.recentViews, JSON.stringify(recentViewIds));
    }, [recentViewIds]);

    const handleFinishOnboarding = () => {
        localStorage.setItem(STORAGE_KEYS.onboarding, "true");
        setScreen("home");
    };

    const handleOpenApp = app => {
        setSelectedApp(app);
        setScreen("detail");

        setRecentViewIds(prev => {
            const filtered = prev.filter(id => id !== app.id);
            return [app.id, ...filtered].slice(0, 20);
        });
    };

    const handleOpenGallery = (startIndex = 0) => {
        setGalleryIndex(startIndex);
        setGalleryOpen(true);
    };

    const handleCloseGallery = () => {
        setGalleryOpen(false);
    };

    const recentlyViewedApps = useMemo(
        () => recentViewIds.map(id => APPS.find(a => a.id === id)).filter(Boolean),
        [recentViewIds]
    );

    const viewsByCategory = useMemo(() => {
        const map = {};
        recentViewIds.forEach(id => {
            const app = APPS.find(a => a.id === id);
            if (!app) return;
            map[app.category] = (map[app.category] || 0) + 1;
        });
        return map;
    }, [recentViewIds]);

    const uniqueViewedCount = useMemo(() => new Set(recentViewIds).size, [recentViewIds]);

    const recommendedApps = useMemo(() => {
        if (recentViewIds.length === 0) return [];

        let topCategory = null;
        let maxCount = 0;
        Object.entries(viewsByCategory).forEach(([cat, count]) => {
            if (count > maxCount) {
                maxCount = count;
                topCategory = cat;
            }
        });

        if (!topCategory) return [];

        const viewedSet = new Set(recentViewIds);
        const candidates = APPS.filter(a => a.category === topCategory && !viewedSet.has(a.id));

        if (candidates.length === 0) {
            return APPS.filter(a => a.category === topCategory)
                .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                .slice(0, 3);
        }

        return candidates.slice(0, 3);
    }, [viewsByCategory, recentViewIds]);

    const achievements = useMemo(() => {
        const financeViews = viewsByCategory["Финансы"] || 0;
        const gamesViews = viewsByCategory["Игры"] || 0;

        return [
            {
                id: "finance-explorer",
                title: "Исследователь финансов",
                unlocked: financeViews >= 3,
                progress: Math.min(financeViews / 3, 1),
            },
            {
                id: "games-guru",
                title: "Гуру игр",
                unlocked: gamesViews >= 3,
                progress: Math.min(gamesViews / 3, 1),
            },
            {
                id: "apps-10",
                title: "Посмотрел 10 приложений",
                unlocked: uniqueViewedCount >= 10,
                progress: Math.min(uniqueViewedCount / 10, 1),
            },
        ];
    }, [viewsByCategory, uniqueViewedCount]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {screen === "onboarding" && <Onboarding onFinish={handleFinishOnboarding} />}

            {screen === "home" && (
                <MainScreen
                    apps={APPS}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    onOpenCategories={() => setScreen("categories")}
                    onOpenApp={handleOpenApp}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    isLoading={isLoading}
                    recentlyViewedApps={recentlyViewedApps}
                    recommendedApps={recommendedApps}
                    dailyRecommendation={dailyRecommendation}
                    achievements={achievements}
                />
            )}

            {screen === "categories" && (
                <CategoriesScreen
                    categories={CATEGORIES}
                    onBack={() => setScreen("home")}
                    onSelectCategory={cat => {
                        setSelectedCategory(cat);
                        setScreen("home");
                    }}
                    apps={APPS}
                    viewsByCategory={viewsByCategory}
                />
            )}

            {screen === "detail" && selectedApp && (
                <>
                    <AppDetail
                        app={selectedApp}
                        onBack={() => setScreen("home")}
                        onOpenGallery={handleOpenGallery}
                    />
                    <ScreenshotGallery
                        open={galleryOpen}
                        onClose={handleCloseGallery}
                        app={selectedApp}
                        index={galleryIndex}
                        onChangeIndex={setGalleryIndex}
                    />
                </>
            )}
        </ThemeProvider>
    );
}

export default App;