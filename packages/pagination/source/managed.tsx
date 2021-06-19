import Pagination, { PaginationProps } from "./basic";
import List, { ListProps } from "@rodrigosaint/list";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

interface Page<T> {
  collection: Array<T>;
  currentPage: number;
  pageCount: number;
}

interface ManagedPaginationProps<T> extends Omit<ListProps<T>, "collection"> {
  query: (pageNumber: Number) => Promise<Page<T>>;
  onError?: (error) => any;
  renderSkeleton?: () => React.ReactNode;
  skeletonCount?: number;
}

export default function ManagedPagination<T>(props: ManagedPaginationProps<T>) {
  const [page, setPage] = useState<Page<T>>();
  const [isLoading, setLoading] = useState(false);
  const onPageChange = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);
        setPage(await props.query(pageNumber));
      } catch (error) {
        props.onError(error);
      } finally {
        setLoading(false);
      }
    },
    [props.query, props.onError]
  );

  useEffect(() => {
    onPageChange(1);
  }, [onPageChange]);

  return (
    <Pagination
      currentPage={page?.currentPage}
      pageCount={page?.pageCount}
      onPageChange={onPageChange}
    >
      {page && !isLoading && (
        <List
          render={props.render}
          getKey={props.getKey}
          collection={page.collection}
        />
      )}
      {isLoading && props.renderSkeleton && (
        <List
          render={props.renderSkeleton}
          getKey={(item) => item}
          collection={Array.from(Array(props.skeletonCount || 3))}
        />
      )}
    </Pagination>
  );
}
