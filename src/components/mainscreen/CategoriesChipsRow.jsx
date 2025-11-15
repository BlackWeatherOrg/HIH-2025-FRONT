import React from "react";
import { Box, Chip } from "@mui/material";

const CategoriesChipsRow = ({ categories = [], selectedCategory, onSelectCategory }) => {
    return (
        <Box
            sx={{
                mb: 3,
                display: "flex",
                gap: 1,
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": { height: 4 },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#d1d5db",
                    borderRadius: 999,
                },
            }}>
            {categories.map(cat => {
                const isAll = cat === "Все" || cat === "Все приложения";
                const isActive = (!selectedCategory && isAll) || selectedCategory === cat;

                return (
                    <Chip
                        key={cat}
                        label={cat}
                        onClick={() => onSelectCategory(isAll ? null : cat)}
                        clickable
                        disableRipple
                        sx={{
                            borderRadius: 999,
                            px: 1,
                            bgcolor: isActive ? "#e0ecff" : "#ffffff",
                            color: isActive ? "#1d4ed8" : "#4b5563",
                            border: isActive ? "1px solid #bfdbfe" : "1px solid #e5e7eb",
                            "& .MuiChip-label": {
                                fontWeight: isActive ? 600 : 400,
                            },
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default CategoriesChipsRow;