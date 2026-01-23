import * as React from 'react';
import Typography from '@mui/material/Typography';
import PostsPagination from '../../shared/Pagination';
import { PostsWithoutImage } from '../../shared/Posts';
import { postsData } from '../../shared/TestData';
import { paginate } from '../../stdfunc';

export default function Latest() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 12;

    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Latest
            </Typography>
            <PostsWithoutImage
                posts={paginate(postsData, currentPage, perPage)}
            ></PostsWithoutImage>
            <PostsPagination
                total={postsData.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </div>
    );
}
