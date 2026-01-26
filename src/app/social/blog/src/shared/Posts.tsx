import * as React from "react";
import * as ReactRouter from "react-router-dom";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Author, AuthorsWithDate } from "./Author";
import MainFallback from "./MainFallback";

export interface Post {
    authors: Author[];
    content: string;
    createdAt: string;
    description: string;
    id: number;
    tag: string;
    imageUrl?: string;
    title: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 0,
    "&:hover": {
        backgroundColor: "transparent",
        cursor: "pointer",
    },
    "&:focus-visible": {
        outline: "3px solid",
        outlineColor: "hsla(210, 98%, 48%, 0.5)",
        outlineOffset: "2px",
    },
}));

const StyledCardContent = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 4,
    padding: 16,
    "&:last-child": {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

export function Posts({ posts }: { posts: Post[] }) {
    const navigate = ReactRouter.useNavigate();

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<
        number | null
    >(null);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <MainFallback itemsLength={posts.length}>
            <Grid container spacing={2} columns={12}>
                {posts.map((post, index) => (
                    <Grid key={post.id ?? index} size={{ xs: 12, md: 4 }}>
                        <StyledCard
                            onClick={() => {
                                navigate(`/post/${post.id}`);
                            }}
                            className={
                                focusedCardIndex === 0 ? "Mui-focused" : ""
                            }
                            onBlur={handleBlur}
                            onFocus={() => handleFocus(0)}
                            tabIndex={0}
                            variant="outlined"
                        >
                            <CardMedia
                                alt="green iguana"
                                component="img"
                                image={
                                    post.imageUrl ??
                                    `https://picsum.photos/800/450?random=${post.id ?? index}`
                                }
                                sx={{
                                    aspectRatio: "16 / 9",
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                }}
                            />
                            <StyledCardContent>
                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    component="div"
                                >
                                    {post.tag}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {post.title}
                                </Typography>
                                <StyledTypography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {post.description}
                                </StyledTypography>
                            </StyledCardContent>
                            <AuthorsWithDate authors={post.authors} />
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </MainFallback>
    );
}

const TitleTypography = styled(Typography)(({ theme }) => ({
    "&:hover": { cursor: "pointer" },
    position: "relative",
    textDecoration: "none",
    "& .arrow": {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        visibility: "hidden",
    },
    "&:hover .arrow": {
        opacity: 0.7,
        visibility: "visible",
    },
    "&:focus-visible": {
        borderRadius: "8px",
        outline: "3px solid",
        outlineColor: "hsla(210, 98%, 48%, 0.5)",
        outlineOffset: "3px",
    },
    "&::before": {
        backgroundColor: (theme.vars || theme).palette.text.primary,
        bottom: 0,
        content: '""',
        height: "1px",
        left: 0,
        opacity: 0.3,
        position: "absolute",
        transition: "width 0.3s ease, opacity 0.3s ease",
        width: 0,
    },
    "&:hover::before": {
        width: "100%",
    },
}));

export function PostsWithoutImage({ posts }: { posts: Post[] }) {
    const navigate = ReactRouter.useNavigate();

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<
        number | null
    >(null);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <MainFallback itemsLength={posts.length}>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {posts.map((post, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                height: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="caption"
                                component="div"
                            >
                                {post.tag}
                            </Typography>
                            <TitleTypography
                                onClick={() => {
                                    navigate(`/post/${post.id}`);
                                }}
                                className={
                                    focusedCardIndex === index
                                        ? "Mui-focused"
                                        : ""
                                }
                                gutterBottom
                                onBlur={handleBlur}
                                onFocus={() => handleFocus(index)}
                                tabIndex={0}
                                variant="h6"
                            >
                                {post.title}
                                <NavigateNextRoundedIcon
                                    className="arrow"
                                    sx={{ fontSize: "1rem" }}
                                />
                            </TitleTypography>
                            <StyledTypography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {post.description}
                            </StyledTypography>

                            <AuthorsWithDate authors={post.authors} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </MainFallback>
    );
}
