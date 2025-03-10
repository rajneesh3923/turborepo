import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
import { NotificationRow } from "../../app/client/db/notifications";
import sanitize from "sanitize-html-react";
import dayjs from "dayjs";

interface NotificationCardProps {
  notification: NotificationRow;
  onClick: (notification: NotificationRow) => void;
}

export default function QuotationNotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  return (
    <Flex
      key={notification.id}
      alignItems="start"
      cursor="pointer"
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
