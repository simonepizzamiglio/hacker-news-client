import type { ItemsType, Page } from "@/lib/api";
import {
  fetchPageItems,
  getItemPages,
  ItemsTypeEnum,
  ItemsTypeSchema,
} from "@/lib/api";
import type { CardNewsProps } from "@/components/card-news";
import { CardNews, CardNewsSkeleton } from "@/components/card-news";
import { LoadMoreButton } from "@/components/load-more-button";
import { NoPosts } from "@/components/no-posts";
import { isJobItem, isStoryItem } from "@/lib/schemas";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { exhaustiveGuard } from "@/lib/utils";

type PageProps = {
  params: { items: string };
  searchParams: { page?: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { items = "" } = params;
  const safeItemsType = ItemsTypeSchema.safeParse(items);

  if (!safeItemsType.success) {
    return {
      title: "Not found",
    };
  }

  return {
    title: "New Link | Hacker news",
  };
}

const oneMinute = 60;
export const revalidate = oneMinute * 15; // revalidate every 15 mins

export default async function Items({ searchParams, params }: PageProps) {
  const { items = "" } = params;
  const safeItemsType = ItemsTypeSchema.safeParse(items);

  if (!safeItemsType.success) {
    return notFound();
  }
  const itemTypes = safeItemsType.data;
  const currentPage = parseInt(searchParams.page ?? "1", 10);
  const nextPage = currentPage + 1;
  const pages = await getItemPages(itemTypes);
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

  const { title, subtitle } = getHeadings(itemTypes);

  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        <h2 className="text-sm font-normal text-neutral-500">{subtitle}</h2>
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
        if (!item) return null;

        const isJob = isJobItem(item);
        const isStory = isStoryItem(item);
        const isJobOrStory = isJob || isStory;

        if (!isJobOrStory) {
          return null;
        }

        const cardProps: CardNewsProps = {
          id: item.id,
          title: item.title,
          timestamp: item.time,
          postType: item.type,
          href: item.url,
        };

        if (isStory) {
          cardProps.points = item.score;
          cardProps.by = item.by;
          cardProps.commentsCount = item.descendants;
        }

        return (
          <li key={`card-item-${item.id}`}>
            <CardNews {...cardProps} />
          </li>
        );
      })}
    </>
  );
}

function getHeadings(itemsType: ItemsType): {
  title: string;
  subtitle: string;
} {
  switch (itemsType) {
    case ItemsTypeEnum.new:
      return {
        title: "New",
        subtitle:
          "Discover the latest submissions in the Hacker News community.",
      };
    case ItemsTypeEnum.ask:
      return {
        title: "Ask",
        subtitle:
          "Explore community-driven Q&A where users seek insights and advice.",
      };
    case ItemsTypeEnum.show:
      return {
        title: "Show",
        subtitle:
          "Showcase your projects, products, and discoveries to the Hacker News audience.",
      };
    case ItemsTypeEnum.jobs:
      return {
        title: "Jobs",
        subtitle:
          "Connect with top tech job opportunities and company hiring posts.",
      };
    default:
      return exhaustiveGuard(itemsType);
  }
}
