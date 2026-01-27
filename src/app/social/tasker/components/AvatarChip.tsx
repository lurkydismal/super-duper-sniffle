import { Chip } from "@mui/material";
import Avatar from "@/components/Avatar";

export default function AvatarChips({ username }: { username: string }) {
    return (
        <Chip
            variant="filled"
            size="medium"
            avatar={<Avatar username={username} />}
            label={username}
        />
    );
}
