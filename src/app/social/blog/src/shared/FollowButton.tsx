import FollowIcon from "@mui/icons-material/PersonAdd";
import UnollowIcon from "@mui/icons-material/PersonRemove";
import Button from "@mui/material/Button";

export default function Follow({
    id,
    doesFollow,
    size,
}: {
    id: number;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
}) {
    return (
        <Button
            size={size ?? "small"}
            onClick={() => {
                console.log("Follow: ", id);
            }}
            color={doesFollow ? "error" : "success"}
            variant="contained"
            startIcon={doesFollow ? <UnollowIcon /> : <FollowIcon />}
        >
            {doesFollow ? "Unfollow" : "Follow"}
        </Button>
    );
}
