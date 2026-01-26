import * as React from "react";
import * as ReactRouter from "react-router-dom";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Author, AuthorWithFollowAndLink } from "../../shared/Author";
import MainFallback from "../../shared/MainFallback";
import { Post } from "../../shared/Posts";

export interface Follow {
    author: Author;
    post: Post;
}

const StyledTypography = styled(Typography)({
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

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

export function Follows({ follows }: { follows: Follow[] }) {
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

    // NOTE: Maybe tab index is needed in title
    return (
        <MainFallback itemsLength={follows.length}>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {follows.map((follow, index) => {
                    const post = follow.post;
                    const user = follow.author;

                    return (
                        <Grid key={user.id} size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    borderRadius: 1,
                                    boxShadow:
                                        "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    paddingBottom: 1,

                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <AuthorWithFollowAndLink
                                    author={follow.author}
                                    variant="h6"
                                    doesFollow={true}
                                />
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
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </MainFallback>
    );
}
