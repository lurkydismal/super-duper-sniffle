import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Posts } from '../../shared/Posts';
import { SearchButton } from '../../shared/SearchButton';
import { TagsAndSearchMobile } from '../../shared/Tags';
import { postsData, tags } from '../../shared/TestData';
import { paginate } from '../../stdfunc';

export default function MainContent() {
    const perPage = 6;
    // const { id, username } = getCredentials();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    Featured
                </Typography>
            </div>
            <SearchButton></SearchButton>
            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>
            <Posts posts={paginate(postsData, 1, perPage)}></Posts>
        </Box>
    );
}
