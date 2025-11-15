import React from "react";
import { Box, Chip, Typography } from "@mui/material";

const getCategoryEmoji = name => {
    if (!name) return "📱";
    const lower = name.toLowerCase();

    if (lower.includes("все")) return "✨";
    if (lower.includes("финанс")) return "💰";
    if (lower.includes("игр")) return "🎮";
    if (lower.includes("государ")) return "🏛️";
    if (lower.includes("транспорт") || lower.includes("навигац")) return "🚗";
    if (lower.includes("инструмент")) return "🛠️";
    if (lower.includes("покуп")) return "🛍️";
    if (lower.includes("общен")) return "💬";
    if (lower.includes("развлеч")) return "🎉";
    if (lower.includes("здоров")) return "💊";
    if (lower.includes("путешеств")) return "✈️";
    if (lower.includes("образован")) return "📚";
    if (lower.includes("спорт")) return "🏅";
    if (lower.includes("новост") || lower.includes("событ")) return "📰";

    return "📱";
};

const normalizeCategories = raw => {
    if (!Array.isArray(raw)) return [];
    const withoutAll = raw.filter(c => c !== "Все" && c !== "Все приложения");
    return ["Все приложения", ...withoutAll];
};

const CategoriesChipsRow = ({ categories = [], selectedCategory, onSelectCategory }) => {
    const list = normalizeCategories(categories);

    const handleClick = cat => {
        const isAll = cat === "Все" || cat === "Все приложения";
        onSelectCategory(isAll ? null : cat);
    };

    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography
                variant='subtitle2'
                sx={{ mb: 1, fontWeight: 600, color: "#111827" }}>
                Категории
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    pb: 0.5,
                    "&::-webkit-scrollbar": { height: 4 },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#d1d5db",
                        borderRadius: 999,
                    },
                }}>
                {list.map(cat => {
                    const isAll = cat === "Все" || cat === "Все приложения";
                    const isActive = (!selectedCategory && isAll) || selectedCategory === cat;

                    return (
                        <Chip
                            key={cat}
                            clickable
                            onClick={() => handleClick(cat)}
                            icon={<span style={{ fontSize: 16 }}>{getCategoryEmoji(cat)}</span>}
                            label={isAll ? "Все приложения" : cat}
                            size='medium'
                            sx={{
                                borderRadius: 999,
                                px: 0.5,
                                bgcolor: isActive ? "#2563eb" : "#f9fafb",
                                color: isActive ? "#ffffff" : "#374151",
                                border: isActive ? "1px solid #2563eb" : "1px solid #e5e7eb",
                                "& .MuiChip-label": {
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: 13,
                                    px: 0.5,
                                },
                                "& .MuiChip-icon": {
                                    color: isActive ? "#ffffff" : "#4b5563",
                                    ml: 0.25,
                                },
                                whiteSpace: "nowrap",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    bgcolor: isActive ? "#1d4ed8" : "#eef2ff",
                                    borderColor: isActive ? "#1d4ed8" : "#c7d2fe",
                                },
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default CategoriesChipsRow;