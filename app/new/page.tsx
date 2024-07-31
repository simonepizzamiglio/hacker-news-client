import type { Page } from "@/lib/api";
import { fetchPageItems, getItemPages } from "@/lib/api";
import { CardNews, CardNewsSkeleton } from "@/components/card-news";
import { LoadMoreButton } from "@/components/load-more-button";
import { NoPosts } from "@/components/no-posts";
import { isStoryItem, PostTypeEnum } from "@/lib/schemas";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Link | Hacker news",
};

const oneMinute = 60;
export const revalidate = oneMinute * 15; // revalidate every 15 mins

export default async function New({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page ?? "1", 10);
  const nextPage = currentPage + 1;
  const pages = await getItemPages(PostTypeEnum.story);
  const currentPageItem = pages[currentPage - 1];
  const lastPage = pages[pages.length - 1];
  const hasMore =
    currentPageItem.pagination.page < lastPage.pagination.totalPages;
  const pagesToShow = pages.slice(0, currentPage);

  // If there are no posts, early return
  if (pages.length === 1 && pages[0].items.length === 0) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center gap-2 py-8">
        <NoPosts />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900">New</h1>
        <h2 className="text-sm font-normal text-neutral-500">
          Discover the latest submissions in the Hacker News community.
        </h2>
      </div>
      <ul className="flex flex-col" aria-label="Articles list">
        {pagesToShow.map((page, i) => (
          <Suspense
            fallback={
              <>
                {page.items.map((_, index) => (
                  <CardNewsSkeleton key={`page-${i}-skeleton-${index}`} />
                ))}
              </>
            }
            key={`stories-page-${i}`}
          >
            <Page page={page} />
          </Suspense>
        ))}
      </ul>
      {hasMore && <LoadMoreButton nextPage={nextPage} className="mt-4" />}
    </div>
  );
}

async function Page({ page }: { page: Page }) {
  const items = await fetchPageItems(page);

  return (
    <>
      {items.map((item) => {
        if (!item || !isStoryItem(item)) return null;

        return (
          <li key={`card-item-${item.id}`}>
            <CardNews
              id={item.id}
              by={item.by}
              commentsCount={item.descendants}
              href={item.url}
              points={item.score}
              postType={item.type}
              timestamp={item.time}
              title={item.title}
            />
          </li>
        );
      })}
    </>
  );
}
