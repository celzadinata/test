"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink as UILink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationData {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface CustomPaginationProps {
  paginationData: PaginationData;
}

export function CustomPagination({ paginationData }: CustomPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    current_page,
    last_page,
    // from,
    // to,
    // total,
    prev_page_url,
    next_page_url,
    links,
  } = paginationData;

  // Create a new URLSearchParams instance to modify
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Filter out Previous and Next from links to get only page numbers
  const pageLinks = links.filter(
    (link) =>
      link.label !== "&laquo; Previous" &&
      link.label !== "Next &raquo;" &&
      link.label !== "..."
  );

  if (last_page <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Results info */}
      {/* <div className="text-sm text-gray-600">
        Menampilkan {from} sampai {to} dari {total} hasil
      </div> */}

      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href={prev_page_url ? createPageURL(current_page - 1) : "#"}
              className={!prev_page_url ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageLinks.map((link, index) => {
            const pageNumber = Number.parseInt(link.label);

            // Handle ellipsis case
            if (link.label === "...") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNumber}>
                <UILink href={createPageURL(pageNumber)} isActive={link.active}>
                  {link.label}
                </UILink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href={next_page_url ? createPageURL(current_page + 1) : "#"}
              className={!next_page_url ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
