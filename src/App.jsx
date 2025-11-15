import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ScreenshotGallery from "components/ScreenshotGallery";
import AppDetail from "pages/AppDetail";
import CategoriesScreen from "pages/CategoriesScreen";
import MainScreen from "pages/MainScreen";
import Onboarding from "components/Onboarding";
import CategoryModal from "components/CategoryModal"; 
import theme from "components/theme";
import { fetchCategories } from "http";
import { fetchApplications } from "http";
import { useDebouncedValue } from "utils/useDebouncedValue";

const STORAGE_KEYS = {
    onboarding: "rustore_onboarding_seen",
    recentViews: "rustore_recent_views",
    dailyRec: "rustore_daily_rec",
};

const getTodayStr = () => new Date().toISOString().slice(0, 10);

function App() {
    const [screen, setScreen] = useState("onboarding");

    const [apps, setApps] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filteredApps, setFilteredApps] = useState([]); 
    const [isBaseLoading, setIsBaseLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const [recentViewIds, setRecentViewIds] = useState([]);
    const [dailyRecommendation, setDailyRecommendation] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popularity");

    const debouncedSearch = useDebouncedValue(searchQuery, 400);

    useEffect(() => {
        const seen = localStorage.getItem(STORAGE_KEYS.onboarding);
        setScreen(seen ? "home" : "onboarding");

        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.recentViews));
            if (Array.isArray(stored)) {
                setRecentViewIds(stored);
            }
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsBaseLoading(true);

                const [appsFromApi, categoriesFromApi] = await Promise.all([
                    fetchApplications(),
                    fetchCategories(),
                ]);

                setApps(appsFromApi);
                setCategories(categoriesFromApi);
                setFilteredApps(appsFromApi); 
                const today = getTodayStr();
                let recApp = null;

                try {
                    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyRec));
                    if (stored && stored.date === today) {
                        recApp = appsFromApi.find(a => a.id === stored.appId) || null;
                    }
                } catch {
                    // ignore
                }

                if (!recApp && appsFromApi.length > 0) {
                    const withFact = appsFromApi.filter(a => a.funFact && a.funFact.trim());
                    const source = withFact.length ? withFact : appsFromApi;
                    recApp = source[Math.floor(Math.random() * source.length)];

                    localStorage.setItem(
                        STORAGE_KEYS.dailyRec,
                        JSON.stringify({ date: today, appId: recApp.id })
                    );
                }

                if (recApp) {
                    setDailyRecommendation(recApp);
                }
            } catch (e) {
                console.error("Ошибка загрузки данных:", e);
            } finally {
                setIsBaseLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (
            !debouncedSearch.trim() &&
            (!selectedCategory || selectedCategory === "Все приложения")
        ) {
            setFilteredApps(apps);
            return;
        }

        const loadFiltered = async () => {
            try {
                setIsSearchLoading(true);
                const params = {};

                if (debouncedSearch.trim()) {
                    params.name = debouncedSearch.trim();
                }

                if (selectedCategory && selectedCategory !== "Все приложения") {
                    params.category = selectedCategory;
                }

                const appsFromApi = await fetchApplications(params);
                setFilteredApps(appsFromApi);
            } catch (e) {
                console.error("Ошибка поиска приложений:", e);
            } finally {
                setIsSearchLoading(false);
            }
        };

        loadFiltered();
    }, [debouncedSearch, selectedCategory, apps]);

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

    const handleOpenCategory = category => {
        setSelectedCategory(category);
        setCategoryModalOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setCategoryModalOpen(false);
        setSelectedCategory(null);
    };

    const recentlyViewedApps = useMemo(
        () => recentViewIds.map(id => apps.find(a => a.id === id)).filter(Boolean),
        [recentViewIds, apps]
    );

    const viewsByCategory = useMemo(() => {
        const map = {};
        recentViewIds.forEach(id => {
            const app = apps.find(a => a.id === id);
            if (!app) return;
            map[app.category] = (map[app.category] || 0) + 1;
        });
        return map;
    }, [recentViewIds, apps]);

    const uniqueViewedCount = useMemo(() => new Set(recentViewIds).size, [recentViewIds]);

    const recommendedApps = useMemo(() => {
        if (recentViewIds.length === 0 || apps.length === 0) return [];

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
        const candidates = apps.filter(a => a.category === topCategory && !viewedSet.has(a.id));

        if (candidates.length === 0) {
            return apps
                .filter(a => a.category === topCategory)
                .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                .slice(0, 3);
        }

        return candidates.slice(0, 3);
    }, [viewsByCategory, recentViewIds, apps]);

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

    const isLoading = isBaseLoading || isSearchLoading;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {screen === "onboarding" && <Onboarding onFinish={handleFinishOnboarding} />}

            {screen === "home" && (
                <MainScreen
                    apps={apps} 
                    list={filteredApps} 
                    categories={categories} 
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
                    categories={categories}
                    onBack={() => setScreen("home")}
                    onSelectCategory={handleOpenCategory}
                    apps={apps}
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

            <CategoryModal
                open={categoryModalOpen}
                onClose={handleCloseCategoryModal}
                category={selectedCategory}
                apps={apps}
                onOpenApp={handleOpenApp}
            />
        </ThemeProvider>
    );
}

export default App;