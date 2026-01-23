import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

function Search() {
    return (
        <FormControl
            sx={{ width: { xs: '100%', md: '25ch' } }}
            variant="outlined"
        >
            <OutlinedInput
                id="search"
                placeholder="Search…"
                size="small"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment
                        position="start"
                        sx={{ color: 'text.primary' }}
                    >
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

export function SearchButton() {
    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'row',
                gap: 1,
                overflow: 'auto',
                width: { xs: '100%', md: 'fit-content' },
            }}
        >
            <Search />
            <IconButton size="small" aria-label="RSS feed">
                <RssFeedRoundedIcon />
            </IconButton>
        </Box>
    );
}

export function SearchButtonMobile() {
    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'row',
                gap: 1,
                overflow: 'auto',
                width: { xs: '100%', md: 'fit-content' },
            }}
        >
            <Search />
            <IconButton size="small" aria-label="RSS feed">
                <RssFeedRoundedIcon />
            </IconButton>
        </Box>
    );
}
