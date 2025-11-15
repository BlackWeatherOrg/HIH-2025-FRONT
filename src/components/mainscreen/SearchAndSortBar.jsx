import React from "react";
import {
    Paper,
    Stack,
    TextField,
    InputAdornment,
    MenuItem,
    Typography,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

const sortOptions = [
    { value: "popularity", label: "По популярности" },
    { value: "newest", label: "Сначала новые" },
    { value: "rating", label: "По рейтингу" },
];

const SearchAndSortBar = ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                mb: 2,
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                background: "linear-gradient(135deg, #f9fafb 0%, #eff6ff 45%, #f9fafb 100%)",
            }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
                mb={1.5}>
                <Box>
                    <Typography
                        variant='subtitle2'
                        sx={{ fontWeight: 700, color: "#111827" }}>
                        Поиск и фильтры
                    </Typography>
                    <Typography
                        variant='caption'
                        sx={{ color: "#6b7280" }}>
                        Найдите нужное приложение за пару секунд
                    </Typography>
                </Box>
                <Tooltip title='Очистить поиск'>
                    <span>
                        <IconButton
                            size='small'
                            disabled={!searchQuery}
                            onClick={() => onSearchChange("")}
                            sx={{
                                borderRadius: 2,
                                border: "1px solid #e5e7eb",
                                bgcolor: "white",
                                "&:hover": {
                                    bgcolor: "#eff6ff",
                                },
                            }}>
                            <SearchIcon
                                sx={{
                                    fontSize: 18,
                                    color: searchQuery ? "#2563eb" : "#9ca3af",
                                }}
                            />
                        </IconButton>
                    </span>
                </Tooltip>
            </Stack>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}>
                <TextField
                    fullWidth
                    size='small'
                    placeholder='Поиск приложений по названию'
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon sx={{ fontSize: 20, color: "#9ca3af" }} />
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
                    sx={{
                        minWidth: { xs: "100%", sm: 210 },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SortIcon sx={{ fontSize: 20, color: "#9ca3af" }} />
                            </InputAdornment>
                        ),
                    }}>
                    {sortOptions.map(opt => (
                        <MenuItem
                            key={opt.value}
                            value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
        </Paper>
    );
};

export default SearchAndSortBar;