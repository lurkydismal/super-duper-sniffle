import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AuthorsWithDateAndLink } from '../../shared/Author';
import Markdown from '../../shared/Markdown';
import { Post } from '../../shared/Posts';
import { postsData } from '../../shared/TestData';

export default function MainContent() {
    const { id } = ReactRouter.useParams();
    const post: Post = postsData[Number(id!)];

    const properties = {
        authors: post.authors,
        variant: 'h4',
        avatarWidth: 36,
        avatarHeight: 36,
    } satisfies React.ComponentProps<typeof AuthorsWithDateAndLink>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AuthorsWithDateAndLink {...properties} />
            <Typography variant="subtitle1" component="div">
                {post.tag}
            </Typography>
            <Typography gutterBottom tabIndex={0} variant="h3">
                {post.title}
            </Typography>
            <CardMedia
                alt="green iguana"
                component="img"
                image={
                    post.imageUrl ??
                    `https://picsum.photos/2400/1800?random=${post.id}`
                }
                sx={{
                    aspectRatio: '12 / 6',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            />
            <Markdown>{post.content}</Markdown>
        </Box>
    );
}
