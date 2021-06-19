import React from "react";
import styled from "styled-components";
import Space from "@rodrigosaint/space";
import Button from "@rodrigosaint/button";
import { Text } from "@rodrigosaint/text-essentials";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  children: any;
}

const PaginationMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
  children,
}: PaginationProps) {
  const goToNext = React.useCallback(() => onPageChange(currentPage + 1), [
    onPageChange,
    currentPage,
  ]);

  const goToPrevious = React.useCallback(() => onPageChange(currentPage - 1), [
    onPageChange,
    currentPage,
  ]);

  return (
    <div>
      <Space margin={{ bottom: 4 }}>{children}</Space>
      <PaginationMenu>
        <Button disabled={currentPage === 1} onClick={goToPrevious}>
          Previous Page
        </Button>
        <Space margin={{ vertical: 0, horizontal: 3 }}>
          <Text>{`Page ${currentPage} of ${pageCount}`}</Text>
        </Space>
        <Button disabled={currentPage === pageCount} onClick={goToNext}>
          Next Page
        </Button>
      </PaginationMenu>
    </div>
  );
}
