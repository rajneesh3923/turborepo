import {
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Popover,
  Box,
  Flex,
  Text,
  Avatar,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { BellRingIcon } from "lucide-react";
import { useChannel } from "ably/react";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { notificationsQuery } from "frontend/app/client/queries/notifications";
import { useEffect, useState } from "react";
import QuotationNotificationCard from "frontend/components/Notification/QuotationNotificationCard";
import GeneralNotificationCard from "frontend/components/Notification/GeneralNotificationCard";
import {
  NotificationRow,
  notificationStatusEnum,
} from "frontend/app/client/db/notifications";
import Loading from "frontend/components/common/Loading";
import { useTRPC } from "../../../../utils/trpc";

export default function Notifications({ user }: { user: User }) {
  const [notficationsCount, setNotificationCount] = useState(0);
  const trpc = useTRPC();

  const { data, isLoading, isError, refetch } = useQuery(
    trpc.notifications.getNotifications.queryOptions()
  );

  console.log("NOTIFICATIONS", data?.data);
  const { data: notificationCount } = useQuery(
    trpc.notifications.getNotificationsCount.queryOptions()
  );

  console.log("NOTIFICATIONS COUNT", notificationCount);
  const toast = useToast();

  // const { publish } = useChannel(`notifications:${user.email}`);

  const { channel } = useChannel(
    `notifications:${user.email}`,
    "new-quotation",
    (msg) => {
      toast({
        title: msg.data.body,
        status: "success",
        position: "top-right",
      });
      refetch();
      setNotificationCount(notficationsCount + 1);
      console.log("msgggg", msg);
    }
  );

  useEffect(() => {
    if (notificationCount) {
      setNotificationCount(notificationCount);
    }
  }, [notificationCount]);

  console.log("notificaitons", data);

  const onNotificationClick = (notification: NotificationRow) => {
    console.log(notification);
  };

  const renderNotifications = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (data && data.data.length <= 0) {
      return (
        <Flex justifyContent="center" alignItems="center">
          <Text textAlign="center">No notifications</Text>
        </Flex>
      );
    }

    if (data && data.data) {
      return data.data.map((notification) => {
        switch (notification.type) {
          case notificationStatusEnum.Enum.NEW_QUOTATION: {
            return (
              <Box>
                <QuotationNotificationCard
                  notification={notification}
                  onClick={onNotificationClick}
                />
                <Divider />
              </Box>
            );
          }
          case notificationStatusEnum.enum.GENERAL: {
            return (
              <Box>
                <GeneralNotificationCard
                  notification={notification}
                  onClick={onNotificationClick}
                />
                <Divider />
              </Box>
            );
          }
        }
      });
    }
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            bg="gray.100"
            borderRadius={10}
            size="lg"
            border="none"
            aria-label="Search database"
            // onClick={() => publish("new", { data: "SDASDS" })}
            icon={<BellRingIcon color="gray" size={20} />}
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            pos="absolute"
            top={-1}
            right={-2}
            bg="primary.400"
            color="white"
            w={5}
            h={5}
            rounded="full"
          >
            <Text fontSize={15}>{notficationsCount}</Text>
          </Flex>
        </Box>
      </PopoverTrigger>
      <PopoverContent borderRadius={10} borderWidth={0} shadow="xl">
        <PopoverArrow />
        <PopoverCloseButton py={5} />
        <PopoverHeader fontWeight={700} py={3} verticalAlign="center">
          Notificaitons
        </PopoverHeader>
        <PopoverBody p={0} minH="20rem">
          {renderNotifications()}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
