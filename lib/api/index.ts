import { PostItemSchema, PostTypeEnum } from "@/lib/schemas";
import { exhaustiveGuard } from "@/lib/utils";
import { z } from "zod";

const BASE_URL = "https://hacker-news.firebaseio.com";
const API_VERSION = "v0";
const API_URL = `${BASE_URL}/${API_VERSION}`;

type SupportedItemTypes = typeof PostTypeEnum.story | typeof PostTypeEnum.job;

const PageSchema = z.object({
  pagination: z.object({
    size: z.number().describe("The size of the page."),
    page: z.number().describe("The number of the page."),
    totalPages: z.number().describe("The number of pages."),
    totalItems: z.number().describe("The number of items in total."),
  }),
  items: z.array(z.number()).describe("The list of IDs."),
});
export type Page = z.infer<typeof PageSchema>;

const PAGE_SIZE = 20;

/**
 *
 * @param items Array of IDs
 * @returns Two dimensional array containing IDs for each page
 */
function getIdsByPage(items: number[]) {
  const pages: number[][] = [];
  for (let i = 0; i < items.length; i += PAGE_SIZE) {
    const page = items.slice(i, i + PAGE_SIZE);
    pages.push(page);
  }
  return pages;
}

function getItemsUrl(type: SupportedItemTypes) {
  switch (type) {
    case PostTypeEnum.story:
      return `${API_URL}/newstories.json`;
    case PostTypeEnum.job:
      return `${API_URL}/jobstories.json`;
    default:
      return exhaustiveGuard(type);
  }
}

const getNewStoryIdsError = "Failed to fetch top stories";
/**
 * @returns List of story IDs
 */
async function getItemIds(type: SupportedItemTypes) {
  try {
    const url = getItemsUrl(type);
    const res = await fetch(url);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error(getNewStoryIdsError);
    }

    return z.array(z.number()).parse(await res.json());
  } catch (e) {
    console.error(getNewStoryIdsError, e);
    throw new Error(getNewStoryIdsError);
  }
}

/**
 *
 * @param id The id of the item
 * @returns The item, such as a story, comment, job, etc.
 */
export async function fetchItem(id: number) {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const unsafeRes = await res.json();
  return PostItemSchema.nullable().parse(unsafeRes);
}

interface GetPageObjectParams {
  items: number[];
  totalPages: number;
  totalItems: number;
  page: number;
}
/**
 *
 * @returns The page object
 */
function getPageObject({
  items,
  totalPages,
  totalItems,
  page,
}: GetPageObjectParams): Page {
  return {
    pagination: {
      size: items.length,
      page,
      totalPages,
      totalItems,
    },
    items,
  };
}

/**
 *
 * @param ids The list of IDs to fetch
 * @returns An array of promises
 */
export async function fetchItems(ids: number[]) {
  return await Promise.all(ids.map((id) => fetchItem(id)));
}

/**
 *
 * @param page The page item
 * @returns Return the items of the page, such as stories, comments, jobs, etc.
 */
export async function fetchPageItems(page: Page) {
  return await fetchItems(page.items);
}

/**
 * @description
 * Given a page number, it retrieves the data up to that page, starting from the first page.
 */
export async function getItemPages(type: SupportedItemTypes): Promise<Page[]> {
  const storyIds = await getItemIds(type);
  const pageArrays = getIdsByPage(storyIds);
  const totalItems = storyIds.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const pages: Page[] = pageArrays.map((page, index) =>
    getPageObject({
      items: page,
      totalItems,
      totalPages,
      page: index + 1,
    }),
  );

  return z.array(PageSchema).parse(pages);
}
