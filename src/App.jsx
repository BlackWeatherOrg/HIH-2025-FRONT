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

    const setUrlAppId = appId => {
        const url = new URL(window.location.href);

        if (appId != null) {
            url.searchParams.set("appId", appId);
        } else {
            url.searchParams.delete("appId");
        }
        window.history.replaceState({}, "", url);
    };

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

                const params = new URLSearchParams(window.location.search);
                const appIdFromUrl = params.get("appId");

                if (appIdFromUrl) {
                    const found = appsFromApi.find(a => String(a.id) === String(appIdFromUrl));
                    if (found) {
                        setSelectedApp(found);
                        setScreen("detail");
                    }
                }

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
        setUrlAppId(app.id);

        setRecentViewIds(prev => {
            const filtered = prev.filter(id => id !== app.id);
            return [app.id, ...filtered].slice(0, 20);
        });
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const goHome = () => {
        setScreen("home");
        setSelectedApp(null);
        setUrlAppId(null);
        window.scrollTo({ top: 0, behavior: "auto" });
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
        () =>
            recentViewIds
                .map(id => apps.find(a => a.id === id))
                .filter(Boolean)
                .slice(0, 6),
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

    const viewsByApp = useMemo(() => {
        const map = {};
        recentViewIds.forEach(id => {
            map[id] = (map[id] || 0) + 1;
        });
        return map;
    }, [recentViewIds]);

    const uniqueViewedCount = useMemo(() => new Set(recentViewIds).size, [recentViewIds]);

    const recommendedApps = useMemo(() => {
        if (!apps || apps.length === 0) return [];

        const viewedSet = new Set(recentViewIds);
        const hasHistory = recentViewIds.length > 0;

        if (!hasHistory) {
            return [...apps]
                .sort((a, b) => {
                    const ratingA = a.rating || 0;
                    const ratingB = b.rating || 0;
                    const popA = a.popularity || 0;
                    const popB = b.popularity || 0;
                    return ratingB - ratingA || popB - popA;
                })
                .slice(0, 6);
        }

        const maxCatViews = Object.values(viewsByCategory).reduce((m, v) => Math.max(m, v), 0) || 1;
        const maxPopularity = apps.reduce((m, a) => Math.max(m, a.popularity || 0), 0) || 1;

        const now = new Date();
        const lastViewedIds = recentViewIds.slice(0, 3);

        const scored = apps
            .filter(app => !viewedSet.has(app.id))
            .map(app => {
                const catViews = viewsByCategory[app.category] || 0;

                const categoryInterest = catViews / maxCatViews;
                const popularityScore = (app.popularity || 0) / maxPopularity;
                const ratingScore = (app.rating || 0) / 5;

                let score = 0.45 * categoryInterest + 0.2 * popularityScore + 0.25 * ratingScore;

                if (app.editorsChoice) {
                    score += 0.15;
                }

                if (app.createdAt) {
                    const created = new Date(app.createdAt);
                    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
                    if (diffDays <= 60) {
                        score += 0.1;
                    }
                }

                const viewsOfApp = viewsByApp[app.id] || 0;
                if (viewsOfApp > 0) {
                    score -= Math.min(0.15, 0.05 * viewsOfApp);
                }

                const lastViewedApp = apps.find(a => a.id === recentViewIds[0]);
                if (lastViewedApp && lastViewedApp.category === app.category) {
                    score += 0.05;
                }

                if (lastViewedIds.includes(app.id)) {
                    score -= 0.1;
                }

                return { app, score };
            });

        scored.sort((a, b) => b.score - a.score);

        const result = [];
        const categoryCounts = {};

        for (const { app, score } of scored) {
            if (result.length >= 6) break;
            const cat = app.category || "unknown";
            if ((categoryCounts[cat] || 0) >= 3) continue;
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            result.push(app);
        }

        return result;
    }, [apps, viewsByCategory, viewsByApp, recentViewIds]);

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
                    onBack={goHome}
                    onSelectCategory={handleOpenCategory}
                    apps={apps}
                    viewsByCategory={viewsByCategory}
                />
            )}

            {screen === "detail" && selectedApp && (
                <>
                    <AppDetail
                        app={selectedApp}
                        onBack={goHome} 
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