import React from "react";
import { Stack, TextField, InputAdornment, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const sortOptions = [
    { value: "popularity", label: "По популярности" },
    { value: "newest", label: "По новизне" },
    { value: "rating", label: "По рейтингу" },
];

const SearchAndSortBar = ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            mb={2.5}>
            <TextField
                fullWidth
                size='small'
                placeholder='Поиск приложений'
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon sx={{ color: "#9ca3af" }} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                select
                size='small'
                label='Сортировка'
                value={sortBy}
                onChange={e => onSortChange(e.target.value)}
                sx={{ minWidth: 190 }}>
                {sortOptions.map(opt => (
                    <MenuItem
                        key={opt.value}
                        value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </TextField>
        </Stack>
    );
};

export default SearchAndSortBar;