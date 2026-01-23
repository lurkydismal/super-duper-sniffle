import { Avatar, AvatarProps } from "@mui/material";

type AvatarWrapperProps = AvatarProps & {
    username: string;
};

export default function AvatarWrapper({
    username,
    ...props
}: AvatarWrapperProps) {
    return (
        <Avatar {...props} alt={username}>
            {username[0].toUpperCase()}
        </Avatar>
    );
}
