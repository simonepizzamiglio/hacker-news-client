import { timeAgo } from "./timeAgo";

const date = 1722346820418; // Tue Jul 30 2024 15:40:20 GMT+0200 (Central European Summer Time)
jest.useFakeTimers().setSystemTime(new Date(date));

describe("timeAgo", () => {
  test("1 second ago", () => {
    expect(timeAgo(1722346819)).toBe("1 second ago");
  });
  test("30 seconds ago", () => {
    expect(timeAgo(1722346790)).toBe("30 seconds ago");
  });
  test("1 minute ago", () => {
    expect(timeAgo(1722346711)).toBe("1 minute ago");
  });
  test("6 minutes ago", () => {
    expect(timeAgo(1722346451)).toBe("6 minutes ago");
  });
  test("1 hour ago", () => {
    expect(timeAgo(1722339930)).toBe("1 hour ago");
  });
  test("4 hours ago", () => {
    expect(timeAgo(1722329630)).toBe("4 hours ago");
  });
  test("1 day ago", () => {
    expect(timeAgo(1722229630)).toBe("1 day ago");
  });
  test("2 days ago", () => {
    expect(timeAgo(1722129630)).toBe("2 days ago");
  });
  test("1 month ago", () => {
    expect(timeAgo(1719000000)).toBe("1 month ago");
  });
  test("3 months ago", () => {
    expect(timeAgo(1712129630)).toBe("3 months ago");
  });
  test("1 year ago", () => {
    expect(timeAgo(1690301400)).toBe("1 year ago");
  });
  test("3 years ago", () => {
    expect(timeAgo(1600301400)).toBe("3 years ago");
  });
});
