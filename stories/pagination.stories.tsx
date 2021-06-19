import React from "react";
import { Meta } from "@storybook/react";

import Card from "../packages/card/source";
import Pagination, { ManagedPagination } from "../packages/pagination/source";

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

export const DefaultManagedPagination = () => {
  return (
    <ManagedPagination
      query={(page: number) =>
        Promise.resolve({
          collection: [
            `Page ${page} - Test 1`,
            `Page ${page} - Test 2`,
            `Page ${page} - Test 3`,
          ],
          currentPage: page || 1,
          pageCount: 2,
        })
      }
      render={(item) => <Card>{item}</Card>}
      getKey={(item) => item}
    />
  );
};

export const ManagedPaginationWithSkeleton = () => {
  return (
    <ManagedPagination
      query={(page: number) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              collection: [
                `Page ${page} - Test 1`,
                `Page ${page} - Test 2`,
                `Page ${page} - Test 3`,
              ],
              currentPage: page || 1,
              pageCount: 2,
            } as any);
          }, 3000);
        })
      }
      render={(item) => <Card>{item}</Card>}
      getKey={(item) => item as any}
      renderSkeleton={() => <Card>I am loading</Card>}
    />
  );
};
