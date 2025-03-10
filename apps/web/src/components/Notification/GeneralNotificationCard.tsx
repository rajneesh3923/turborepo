import {
  notificationRow,
  NotificationRow,
} from "@/app/client/db/notifications";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import sanitize from "sanitize-html-react";

interface NotificationCardProps {
  notification: NotificationRow;
  onClick: (notification: NotificationRow) => void;
}

export default function GeneralNotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  return (
    <Flex
      cursor="pointer"
      key={notification.id}
      alignItems="start"
      _hover={{
        bg: "primary.50",
      }}
      gap={4}
      p={4}
      onClick={() => onClick(notification)}
    >
      <Avatar
        width="2rem"
        height="2rem"
        name={notification.from_user.name}
        src={""}
      />
      <Box>
        <Text
          dangerouslySetInnerHTML={{ __html: sanitize(notification.body) }}
        ></Text>
        <Text fontWeight={600} color="gray.500" mt={2} fontSize={13}>
          {dayjs(notification.created_at).format("MMM DD, h:mm a")}
        </Text>
      </Box>
    </Flex>
  );
}
