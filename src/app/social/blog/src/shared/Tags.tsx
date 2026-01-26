import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { SearchButtonMobile } from "./SearchButton";

interface Tag {
    id: number;
    name: string;
}

// TODO: Implement
const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.info(
        "You clicked the filter chip. ",
        event.currentTarget.textContent,
    );
};

export function Tags({ tags }: { tags: Tag[] }) {
    return (
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "row",
                gap: 3,
                overflow: "auto",
            }}
        >
            <Chip onClick={handleClick} size="medium" label="All categories" />
            {tags.map((tag, index) => (
                <Chip
                    label={tag.name}
                    key={index}
                    onClick={handleClick}
                    size="medium"
                    sx={{
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                />
            ))}
        </Box>
    );
}

export function TagsAndSearchMobile({ tags }: { tags: Tag[] }) {
    return (
        <Box
            sx={{
                alignItems: { xs: "start", md: "center" },
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: 4,
                justifyContent: "space-between",
                overflow: "auto",
                width: "100%",
            }}
        >
            <Tags tags={tags}></Tags>
            <SearchButtonMobile></SearchButtonMobile>
        </Box>
    );
}
