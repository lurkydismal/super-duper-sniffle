import Badge from "@mui/joy/Badge";
import Avatar, { AvatarProps } from "@mui/joy/Avatar";

type AvatarWithStatusProps = AvatarProps & {
    online?: boolean;
    username?: string;
};

export default function AvatarWithStatus(props: AvatarWithStatusProps) {
    const { online = false, username = "", ...other } = props;
    return (
        <div>
            <Badge
                color={online ? "success" : "neutral"}
                variant={online ? "solid" : "soft"}
                size="sm"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeInset="4px 4px"
            >
                <Avatar size="sm" alt={username} {...other}>
                    {username[0].toUpperCase()}
                </Avatar>
            </Badge>
        </div>
    );
}
