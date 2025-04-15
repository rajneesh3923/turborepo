import Pagination from "frontend/components/common/Pagination";
import { AxiosError } from "axios";
import { ImLocation2 } from "react-icons/im";
import {
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Show, Hide } from "@chakra-ui/react";

import {
  Box,
  Avatar,
  Text,
  Flex,
  Tag,
  Button,
  Skeleton,
  useToken,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  FlightRequestEnum,
  FlightRequestRow,
  FlightRequestRowsWithPagination,
} from "frontend/app/client/db/flightRequest";
import CustomTable from "frontend/components/common/Table";
import { usePathname, useRouter } from "next/navigation";
import CustomDrawer from "frontend/components/common/Drawer";
import FlightRequestQuotationForm from "frontend/components/flighRequest/FlightRequestQuotationForm";
import { useUser } from "frontend/app/hooks/useUser";
import { userRole } from "../../../client/db/user";
import dayjs from "dayjs";
import FlightRequestCard from "frontend/components/flighRequest/FlightRequestCard";

const columnHelper = createColumnHelper<FlightRequestRow>();

const renderStatus = (status: FlightRequestEnum) => {
  switch (status) {
    case "Available":
      return (
        <Tag
          fontSize={13}
          size="md"
          variant="solid"
          bg="green.100"
          color="green.500"
        >
          {status}
        </Tag>
      );
    // case "OnHold":
    //   return (
    //     <Tag size="md" variant="solid" colorScheme="primary">
    //       {status}
    //     </Tag>
    //   );
    // case "Reserved":
    //   return (
    //     <Tag size="md" variant="solid" colorScheme="red">
    //       {status}
    //     </Tag>
    //   );
  }
};

interface FlightBookingRequestListProps {
  quotation?: boolean;
  data: FlightRequestRowsWithPagination | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function FlightBookingRequestList({
  data,
  isLoading,
  isError,
  error,
  setPagination,
  pagination,
  quotation = false,
}: FlightBookingRequestListProps) {
  const [primary300] = useToken("colors", ["primary.300"]);
  const router = useRouter();
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const user = useUser();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpen2,
    isOpen: isOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");

  useEffect(() => {
    if (data?.count) {
      setCount(data?.count as number);
    }
  }, [pagination, pathname, router, data?.count, count]);

  const tableData = useMemo(() => {
    if (isLoading) return Array(30).fill({});
    if (isError) {
      console.error("Error fetching data:", error);
      return []; // or return some fallback data
    }
    return data?.data || [];
  }, [isLoading, isError, data]);

  const renderActionBtns = (status: FlightRequestEnum, id: string) => {
    return (
      <Flex gap={6}>
        {status === "Available" &&
          quotation == false &&
          user?.user_metadata.role === userRole.enum.Agent && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRequestId(id);

                onOpen();
              }}
              fontSize={13}
              size="xs"
              variant="outline"
            >
              Quote Now
            </Button>
          )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRequestId(id);
            onOpen2();
          }}
          fontSize={13}
          size="xs"
          variant="solid"
        >
          Check Quotations
        </Button>
      </Flex>
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("user.name", {
        header: () => "User",
        cell: (info) => {
          return (
            <Flex gap={4} alignItems="center">
              <Avatar
                name="Dan Abrahmov"
                src={info.row.original.user.profilePicURL}
              />
              <Box>
                <Text>{info.getValue()}</Text>
                <Text color="gray.500" fontSize={12}>
                  {info.row.original.user.email}
                </Text>
              </Box>
            </Flex>
          );
        },
      }),
      columnHelper.accessor("departure_city", {
        header: () => "Departure City",
        cell: (info) => (
          <Flex gap={2} alignItems="center">
            <ImLocation2 size={20} color={primary300} />{" "}
            <Text>{info.getValue()}</Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("destination_city", {
        header: () => "Destination city",
        cell: (info) => (
          <Flex gap={2} alignItems="center">
            <ImLocation2 size={20} color={primary300} />{" "}
            <Text>{info.getValue()}</Text>
          </Flex>
        ),
      }),
      columnHelper.accessor("travel_date", {
        header: () => (
          <Text textTransform="capitalize" fontSize={14}>
            Travel date
          </Text>
        ),

        cell: (info) => (
          <Text>{dayjs(info.getValue()).format("DD MMM' YYYY")}</Text>
        ),
      }),
      columnHelper.accessor("class_type", {
        cell: (info) => <Text>{info.getValue()}</Text>,
      }),

      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => renderStatus(info.getValue()),
      }),
      columnHelper.accessor("id", {
        header: () => "",
        cell: (info) =>
          renderActionBtns(info.row.original.status, info.row.original.id),
      }),
    ],
    [primary300, renderActionBtns, user?.user_metadata?.profilePicURL]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton height={8} w="100%" borderRadius={10} />,
          }))
        : columns,
    [isLoading, columns]
  );

  const onPageClick = (page: number) => {
    router.push(`${pathname}?page=${+page + 1}&count=${count}`);
    setPagination({
      ...pagination,
      pageIndex: page,
    });
  };

  if (isError && error instanceof AxiosError) {
    console.log("Error in loading quotation", error);
    throw error;
  }

  const table = useReactTable({
    columns: tableColumns,
    data: tableData ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: count,
    state: {
      pagination,
    },
  });

  const onCancelClick = () => {};

  const onOkClick = () => {
    onClose2();
  };

  const onRowClick = (row: FlightRequestRow) => {
    setSelectedRequestId(row.id);
    onOpen2();
  };

  return (
    <Box>
      <CustomDrawer
        onClose={onClose}
        isOpen={isOpen}
        onOkBtnClick={onOkClick}
        onCancelBtnClick={onCancelClick}
        okBtnText={user?.role === "Admin" ? "Quote Now" : "Ok"}
        title="Quote request"
        size="xl"
      >
        <FlightRequestQuotationForm
          user={user}
          flightRequestId={selectedRequestId}
        />
      </CustomDrawer>
      <CustomDrawer
        onClose={onClose2}
        isOpen={isOpen2}
        onOkBtnClick={onOkClick}
        onCancelBtnClick={onCancelClick}
        okBtnText={user?.role === userRole.enum.Agent ? "Quote Now" : "Ok"}
        size="xl"
        bgColor="gray.50"
      >
        <FlightRequestQuotationForm
          user={user}
          flightRequestId={selectedRequestId}
        />
      </CustomDrawer>

      <Show above="lg">
        <Box height="70vh" overflowY="auto" pos="relative">
          <CustomTable table={table} onRowClick={onRowClick} />
        </Box>
      </Show>

      <Hide above="lg">
        <Flex direction="column" gap={4}>
          {data?.data?.map((flightReq) => {
            return <FlightRequestCard key={flightReq.id} data={flightReq} />;
          })}
        </Flex>
      </Hide>

      <Box>
        <Pagination
          itemsPerPage={10}
          pageCount={table.getPageCount()}
          onPageClick={onPageClick}
          currPage={pagination.pageIndex}
        />
      </Box>
    </Box>
  );
}
