import { flexRender, Table } from "@tanstack/react-table";
import React from "react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface TableProps<T> {
  table: Table<T>;
  onRowClick?: (row: T) => void;
}

export default function CustomTable<T>({ table, onRowClick }: TableProps<T>) {
  return (
    <ChakraTable width="100%" fontSize={14}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup, index) => (
          <Tr key={headerGroup.id + index} border="1px solid gray.200">
            {headerGroup.headers.map((header, index) => (
              <Th key={header.id + index} textAlign="left" color="primary.400">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row, index) => (
          <Tr
            key={row.id + index}
            fontWeight={500}
            _hover={{
              cursor: "pointer",
              shadow: "lg",
              bg: "primary.50",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onRowClick) {
                onRowClick(row.original);
              }
            }}
          >
            {row.getVisibleCells().map((cell, index) => (
              <Td key={cell.id + index}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <Tr key={footerGroup.id}>
            {footerGroup.headers.map((header, index) => (
              <Th key={header.id + index}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Tfoot>
    </ChakraTable>
  );
}
