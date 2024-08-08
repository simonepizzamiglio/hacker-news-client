import { timeAgo } from "@/lib/utils";
import { test, expect } from "@playwright/test";
test.describe("Post item", () => {
  test("Shows external link and opens a new tab when clicked", async ({
    page,
    context,
  }) => {
    // It's safe to the this item as comments are not allowed anymore
    await page.goto("/item/7131231");

    const title = await page.title();
    const article = await page.getByRole("article");
    expect(title).toBe("US makes Bitcoin exchange arrests");
    await article
      .getByRole("heading", { name: "US makes Bitcoin exchange arrests" })
      .isVisible();

    await article.getByText("(bbc.co.uk)").isVisible();
    await article.getByText("411 points").isVisible();
    await article.getByText("by majc2").isVisible();
    await article.getByText("308 comments").isVisible();
    await article.getByText(timeAgo(1390840503)).isVisible();

    const externalLink = await article.getByRole("link", {
      name: "US makes Bitcoin exchange arrests",
    });
    await externalLink.isVisible();
    externalLink.click();
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      externalLink.click(), // Opens a new tab
    ]);
    await newPage.waitForLoadState();
  });
  test("Shows internal post text", async ({ page }) => {
    // It's safe to the this item as comments are not allowed anymore
    await page.goto("/item/6851457");

    const title = await page.title();
    const article = await page.getByRole("article");
    expect(title).toBe("Ask HN: Whats the math around Bitcoin on EC2");
    await article
      .getByRole("heading", {
        name: "	Ask HN: Whats the math around Bitcoin on EC2",
      })
      .isVisible();

    await article
      .getByText(
        "I get that Bitcoin mining is no profitable on EC2 (at least I assume it isn't). However, I have no numbers to back it up. Can someone please walk through the numbers so when someone asks me, I can tell them why it isn't profitable on EC2, even with today's high BTC prices.",
      )
      .isVisible();
  });
  test("Shows comments", async ({ page }) => {
    // It's safe to the this item as comments are not allowed anymore
    await page.goto("/item/7131231");

    const commentsSection = await page.getByTestId("comments-section");
    await commentsSection.getByText("308 comments").isVisible();

    const firstCommentsList = await page.getByRole("list").first();
    const firstComment = firstCommentsList.getByRole("listitem").first();
    await firstComment.getByText("eterm");
    await firstComment.getByText(timeAgo(1390843332));
    await firstComment.getByText("A good excerpt from page 13.");
    await firstComment.getByText(
      `"Shrem email accounts reflect that "BTCKing" not only obtained his supply of Bitcoins through the Company, but did so with extensive support from SHREM. Even though SHREM quickly realized that "BTCKing" was reselling Bitcoins on Silk Road, which SHREM knew to be a marketplace for illicit drugs, SHREM went out of his way to facilitate "BTCKing's" business. Among other things, SHREM: permitted "BTCKing" to continue doing business with the Company, despite initially threatening to "ban" him based on his illegal activity; personally ensured that "BTCKing's" orders with the Company were filled everyday; gave "BTCKing" discounts based on his large order volume; sought to conceal "BTCKing's" activity from the Co-founder and the Cash Processor to prevent "BTCKing's" orders from being blocked; advised "BTCKing" how to evade the transaction limits imposed by the Company's own AML policy; let "BTCKing" conduct large transactions without ever verifying his identity, in violation of federal AML laws; and failed to file a single Suspicious Activity Report about "BTCKing," [sic] despite the obvious "red flags" raised by "BTCKing's" dealings with the Company."`,
    );
    await firstComment.getByText(
      "If all that is alledged is true, that's pretty damning and this isn't just a general bitcoin crackdown.",
    );

    const repliesToFirstComment = await firstComment.getByRole("list").first();
    const firstReply = repliesToFirstComment.getByRole("listitem").first();
    await firstReply.getByText("downandout");
    await firstReply.getByText(timeAgo(1390854913));
    await firstReply.getByText(
      "This arrest is much more about Charlie Shrem than Bitcoin itself.  While no one had any idea that this specific activity was happening, Charlie and Bitinstant were incredibly reckless and cash hungry for quite a while.  About a year ago BitInstant became more Ponzi scheme than Bitcoin brokerage - see the last few hundred pages of complaints here:",
    );
    await firstReply.getByRole("link", {
      name: "https://bitcointalk.org/index.php?topic=128314.7380",
    });
    await firstReply.getByText(
      "There is also a pending lawsuit against Bitinstant itself awaiting class action certification, essentially alleging the cherry picking of transactions in order to maximize profits and eliminate market risk for them.",
    );

    const secondReply = repliesToFirstComment.getByRole("listitem").nth(1);
    await secondReply.getByText("synctext");
    await secondReply.getByText(timeAgo(1390844548));
    await secondReply.getByText("The US Attorney Press release puts it nice:");
  });
  test("Shows poll", async ({ page }) => {
    await page.goto("/item/5536734");
    const title = await page.title();
    const article = await page.getByRole("article");
    expect(title).toBe("Poll: What is your age?");
    await article
      .getByRole("heading", { name: "Poll: What is your age?" })
      .isVisible();
    await page
      .getByText(
        "It would be interesting to know which age group(s) HN readers consist mostly of. Please be honest and click one answer only!",
      )
      .isVisible();
    await article.getByText("26 to 30").isVisible();
    await article.getByText("2751 points").isVisible();
    await article.getByText("21 to 25").isVisible();
    await article.getByText("2363 points").isVisible();
    await article
      .getByText("I clicked more than one options above")
      .isVisible();
    await article.getByText("25 points").isVisible();
  });
});
