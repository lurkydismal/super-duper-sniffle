import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Box from '@mui/material/Box';
import { Author, AuthorWithFollow } from '../../shared/Author';
import PostsPagination from '../../shared/Pagination';
import { Posts } from '../../shared/Posts';
import { SearchButton } from '../../shared/SearchButton';
import { TagsAndSearchMobile } from '../../shared/Tags';
import { postsData, tags, user } from '../../shared/TestData';
import { getCredentials, paginate } from '../../stdfunc';

// TODO: Fix avatar src
export default function MainContent() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 6;

    let id: number | null = null;
    let username: string;

    // Router parameter
    {
        const { id: temp } = ReactRouter.useParams();

        id = Number(temp) ?? null;

        // TODO: Implement
        username = user.username;
    }

    const isMeProfile = !id;

    // Router parameter
    if (!id) {
        const { id: temp1, username: temp2 } = getCredentials();

        id = temp1;
        username = temp2;
    }

    // TODO: Implement
    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
        console.info('You clicked the pagination. ', page);

        setCurrentPage(page);
    };

    const properties = {
        author: { id, name: username, avatar: username },
        variant: 'h2',
        avatarWidth: 48,
        avatarHeight: 48,
    } satisfies React.ComponentProps<typeof Author>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isMeProfile ? (
                <Author {...properties}></Author>
            ) : (
                <AuthorWithFollow
                    {...properties}
                    doesFollow={false}
                ></AuthorWithFollow>
            )}
            <SearchButton></SearchButton>
            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>
            <Posts posts={paginate(postsData, currentPage, perPage)}></Posts>
            <PostsPagination
                total={postsData.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </Box>
    );
}
