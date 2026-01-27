import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { UserProps } from "@/types";
// import { toggleMessagesPane } from "@/stdfunc";

type MessagesPaneHeaderProps = {
    sender: UserProps;
};

export default function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
    const { sender } = props;
    const isOnline = sender.online;

    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "space-between",
                py: { xs: 2, md: 2 },
                px: { xs: 1, md: 2 },
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.body",
            }}
        >
            <Stack
                direction="row"
                spacing={{ xs: 1, md: 2 }}
                sx={{ alignItems: "center" }}
            >
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ display: { xs: "inline-flex", sm: "none" } }}
                >
                    <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <Avatar size="lg" alt={sender.name}>
                    {sender.name[0].toUpperCase()}
                </Avatar>
                <Typography
                    component="h2"
                    noWrap
                    endDecorator={
                        <Chip
                            variant="outlined"
                            size="sm"
                            color="neutral"
                            sx={{ borderRadius: "sm" }}
                            startDecorator={
                                <CircleIcon
                                    sx={{ fontSize: 8 }}
                                    color={isOnline ? "success" : "disabled"}
                                />
                            }
                            slotProps={{ root: { component: "span" } }}
                        >
                            {isOnline ? "Online" : "Offline"}
                        </Chip>
                    }
                    sx={{ fontWeight: "lg", fontSize: "lg" }}
                >
                    {sender.name}
                </Typography>
            </Stack>
            {/*
            <Stack spacing={1} direction='row' sx={{ alignItems: 'center' }}>
                <Button
                    startDecorator={<PhoneInTalkRoundedIcon />}
                    color='neutral'
                    variant='outlined'
                    size='sm'
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                >
                    Call
                </Button>
                <Button
                    color='neutral'
                    variant='outlined'
                    size='sm'
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                >
                    View profile
                </Button>
                <IconButton size='sm' variant='plain' color='neutral'>
                    <MoreVertRoundedIcon />
                </IconButton>
            </Stack>
            */}
        </Stack>
    );
}
