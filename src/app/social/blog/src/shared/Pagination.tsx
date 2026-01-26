import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

export default function PostsPagination({
    total,
    perPage,
    onChange,
}: {
    total: number;
    perPage: number;
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
            <Pagination
                onChange={onChange}
                count={Math.ceil(total / perPage)}
                showFirstButton
                showLastButton
            />
        </Box>
    );
}
