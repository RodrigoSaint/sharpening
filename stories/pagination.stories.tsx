import React from "react";
import { Meta } from "@storybook/react";

import Pagination from "../packages/pagination/source";

export default {
  title: "Pagination",
  component: Pagination,
} as Meta;

export const DefaultPagination = () => {
  const [page, setPage] = React.useState(1);
  return (
    <Pagination currentPage={page} pageCount={10} onPageChange={setPage}>
      Content
    </Pagination>
  );
};
