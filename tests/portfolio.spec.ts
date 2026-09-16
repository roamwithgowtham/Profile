import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const contactEndpoint = "https://formsubmit.co/ajax/roamwithgowtham@gmail.com";

async function fillContactForm(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("Adventure Friend");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("friend@example.com");
  await page
    .getByLabel("What’s on your mind?")
    .fill("Let’s plan a weekend cycling adventure!");
}

test.beforeEach(async ({ page }) => {
  // Never send a real email in automated tests. Test-specific mocks override this route.
  await page.route("https://formsubmit.co/**", (route) => route.abort());
  await page.goto("/");
});

test("loads the portfolio and all photographs without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page).toHaveTitle(/Roam with Gowthaman/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A LOT OF LIFE.",
  );
  await expect(page.locator(".adventure-card")).toHaveCount(3);
  await page.getByRole("button", { name: "More adventures, this way" }).click();
  for (const image of await page.locator("img").all()) {
    expect(await image.getAttribute("src")).toMatch(/^\/social\//);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            (element as HTMLImageElement).complete &&
            (element as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
});

test("expands and collapses the adventure journal", async ({ page }) => {
  await page.getByRole("button", { name: "More adventures, this way" }).click();
  await expect(page.locator(".adventure-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Show fewer stories" }).click();
  await expect(page.locator(".adventure-card")).toHaveCount(3);
});

for (const category of [
  "Travel",
  "Fitness",
  "Football",
  "Cycling",
  "Rides",
  "With friends",
]) {
  test(`filters ${category} stories`, async ({ page }) => {
    const filter = page.getByRole("button", { name: category, exact: true });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".adventure-card")).toHaveCount(1);
    await expect(page.locator(".adventure-card .card-category")).toHaveText(
      category,
    );
    await page
      .getByRole("button", { name: "All adventures", exact: true })
      .click();
    await expect(page.locator(".adventure-card")).toHaveCount(3);
  });
}

test("opens a story, traps focus, and returns focus on Escape", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Read Chennai to Vagamon. A greener escape.",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", {
      name: "Chennai to Vagamon. A greener escape.",
    }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Watch the vlog" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=bDfLdKO6PD4");
  await expect(page.getByRole("button", { name: "Close story" })).toBeFocused();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Close story" }).click();
  await expect(dialog).not.toBeVisible();
});

test("interest links choose the relevant journal category", async ({
  page,
}) => {
  await page
    .locator(".interest-strip")
    .getByRole("link", { name: "Athletics & fitness" })
    .click();
  await expect(page).toHaveURL(/#adventures$/);
  await expect(
    page.getByRole("button", { name: "Fitness", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".adventure-card")).toHaveCount(1);
});

test("retains a copyable draft and email fallback when the network fails", async ({
  page,
  context,
}) => {
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.locator(".message-draft")).toHaveCount(0);
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-feedback")).toContainText(
    "couldn’t confirm",
  );
  await expect(page.getByLabel("What’s on your mind?")).toHaveValue(
    "Let’s plan a weekend cycling adventure!",
  );
  await expect(page.getByLabel("Your message draft")).toHaveValue(
    /Hi Gowthaman!.*Adventure Friend/s,
  );
  await expect(
    page.getByRole("link", { name: "Open email app" }),
  ).toHaveAttribute("href", /^mailto:roamwithgowtham@gmail\.com\?subject=/);
  const fallback = new URL(
    (await page
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href"))!,
  );
  expect(fallback.searchParams.get("cc")).toBe("friend@example.com");
  expect(fallback.searchParams.get("body")).toContain(
    "weekend cycling adventure",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy message", exact: true }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "weekend cycling adventure",
  );
});

test("rejects whitespace-only contact fields", async ({ page }) => {
  await page.getByLabel("Your name").fill("   ");
  await page.getByLabel("Email address").fill("friend@example.com");
  await page.getByLabel("What’s on your mind?").fill("   ");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-feedback")).toContainText(
    "Please add your name",
  );
  await expect(page.locator(".message-draft")).toHaveCount(0);
});

for (const success of [true, "true"]) {
  test(`submits the entered fields to the requested inbox (${typeof success} success)`, async ({
    page,
  }) => {
    let submitted: Record<string, unknown> | undefined;
    await page.route(contactEndpoint, async (route) => {
      expect(route.request().method()).toBe("POST");
      submitted = route.request().postDataJSON();
      await route.fulfill({
        json: { success, message: "Form successfully submitted" },
      });
    });
    await fillContactForm(page);
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await expect(page.locator(".contact-feedback")).toContainText(
      "accepted by the email service",
    );
    expect(submitted).toMatchObject({
      name: "Adventure Friend",
      email: "friend@example.com",
      message: "Let’s plan a weekend cycling adventure!",
      _replyto: "friend@example.com",
      _cc: "friend@example.com",
      _subject: "New message — Roam with Gowthaman",
    });
    expect(submitted).not.toHaveProperty("_from");
    expect(submitted).not.toHaveProperty("from");
    await expect(page.locator(".contact-feedback")).toContainText(
      "A copy was requested",
    );
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
    await expect(page.getByLabel("What’s on your mind?")).toHaveValue("");
  });
}

test("uses the new recipient everywhere and discloses CC and the actual sender", async ({
  page,
}) => {
  await expect(page.locator(".contact-direct")).toHaveText(
    "roamwithgowtham@gmail.com",
  );
  await expect(page.locator(".contact-direct")).toHaveAttribute(
    "href",
    "mailto:roamwithgowtham@gmail.com",
  );
  await expect(page.locator("#contact-privacy")).toContainText(
    "entered email added as CC",
  );
  await expect(page.locator("#contact-privacy")).toContainText(
    "FormSubmit’s sender address",
  );
});

test("omits duplicate CC when the visitor is the recipient", async ({
  page,
}) => {
  let submitted: Record<string, unknown> | undefined;
  await page.route(contactEndpoint, async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({ json: { success: true } });
  });
  await fillContactForm(page);
  await page
    .getByLabel("Email address", { exact: true })
    .fill("RoamWithGowtham@gmail.com");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-feedback")).toContainText(
    "accepted by the email service",
  );
  expect(submitted).not.toHaveProperty("_cc");
  expect(submitted?._replyto).toBe("RoamWithGowtham@gmail.com");
  await expect(page.locator(".contact-feedback")).not.toContainText(
    "A copy was requested",
  );
});

test("rejects multiple CC addresses even on a programmatic submission", async ({
  page,
}) => {
  let requestCount = 0;
  await page.route(contactEndpoint, async (route) => {
    requestCount += 1;
    await route.fulfill({ json: { success: true } });
  });
  await fillContactForm(page);
  await page
    .getByLabel("Email address", { exact: true })
    .fill("one@example.com,two@example.com");
  await page.locator(".contact-form").dispatchEvent("submit");
  await expect(page.getByLabel("Email address", { exact: true })).toBeFocused();
  expect(requestCount).toBe(0);
  await expect(page.locator(".contact-feedback")).toHaveCount(0);
});

test("preserves plus-addressed visitor CC in the email fallback", async ({
  page,
}) => {
  await fillContactForm(page);
  await page
    .getByLabel("Email address", { exact: true })
    .fill("friend+cycling@example.com");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  const link = page.getByRole("link", { name: "Open email app" });
  await expect(link).toBeVisible();
  const fallback = new URL((await link.getAttribute("href"))!);
  expect(fallback.searchParams.get("cc")).toBe("friend+cycling@example.com");
});

test("shows pending submission and prevents duplicate sends", async ({
  page,
}) => {
  let requestCount = 0;
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  await page.route(contactEndpoint, async (route) => {
    requestCount += 1;
    await responseGate;
    await route.fulfill({ json: { success: true } });
  });
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  try {
    await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
    await expect(page.getByLabel("Your name", { exact: true })).toBeDisabled();
    await page.locator(".contact-form").dispatchEvent("submit");
    await expect.poll(() => requestCount).toBe(1);
  } finally {
    releaseResponse();
  }
  await expect(page.locator(".contact-feedback")).toContainText(
    "accepted by the email service",
  );
});

for (const failure of ["provider rejection", "HTTP error", "invalid JSON"]) {
  test(`never claims success after ${failure}`, async ({ page }) => {
    await page.route(contactEndpoint, async (route) => {
      if (failure === "HTTP error")
        await route.fulfill({ status: 503, json: { success: true } });
      else if (failure === "invalid JSON")
        await route.fulfill({
          body: "not json",
          contentType: "application/json",
        });
      else
        await route.fulfill({
          json: { success: "false", message: "Rejected" },
        });
    });
    await fillContactForm(page);
    await page
      .getByRole("button", { name: "Send message", exact: true })
      .click();
    await expect(page.locator(".contact-feedback")).toContainText(
      "couldn’t confirm",
    );
    await expect(
      page.getByRole("button", { name: "Send message", exact: true }),
    ).toBeEnabled();
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
      "Adventure Friend",
    );
  });
}

test("handles recipient activation without claiming email delivery", async ({
  page,
}) => {
  await page.route(contactEndpoint, (route) =>
    route.fulfill({
      json: {
        success: "true",
        message: "Please activate your form using the email confirmation link.",
      },
    }),
  );
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-feedback")).toContainText(
    "Email activation is required",
  );
  await expect(page.locator(".contact-feedback")).toContainText(
    "roamwithgowtham@gmail.com",
  );
  await expect(page.getByLabel("Your message draft")).toHaveValue(
    /Adventure Friend/,
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Adventure Friend",
  );
});

test("times out a stalled submission and preserves the message", async ({
  page,
}) => {
  await page.clock.install();
  await page.route(contactEndpoint, () => {
    /* Deliberately leave the mocked request pending. */
  });
  await fillContactForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await page.clock.fastForward(16000);
  await expect(page.locator(".contact-feedback")).toContainText(
    "couldn’t confirm",
  );
  await expect(page.getByLabel("Your message draft")).toHaveValue(
    /weekend cycling/,
  );
});

test("links the professional and personal accounts separately", async ({
  page,
}) => {
  const footer = page.getByRole("contentinfo");
  await expect(
    footer.getByRole("link", { name: "YouTube", exact: true }),
  ).toHaveAttribute("href", "https://www.youtube.com/@Roamwithgowtham");
  await expect(
    footer.getByRole("link", { name: "Instagram · Professional" }),
  ).toHaveAttribute("href", "https://www.instagram.com/roamwithgowtham/");
  await expect(
    footer.getByRole("link", { name: "Instagram · Personal" }),
  ).toHaveAttribute("href", "https://www.instagram.com/gowtham__vasu/");
  await page.getByRole("button", { name: "Football", exact: true }).click();
  await page
    .getByRole("button", { name: "Read For the team. For the beautiful game." })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "View Instagram post" }),
  ).toHaveAttribute(
    "href",
    "https://www.instagram.com/gowtham__vasu/p/Cn9aXm2PUoq/",
  );
});

test("mobile navigation opens, follows anchors, and closes with Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-only menu");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "My story", exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
});

test("fits narrow phones, tablets, and desktops with a three-line hero", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Viewport matrix runs once on desktop Chromium");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 360, 375, 390, 600, 768, 820, 1024, 1200, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const heading = document.querySelector("h1")!;
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        headingLines:
          (heading.clientHeight - 20) /
          Number.parseFloat(getComputedStyle(heading).lineHeight),
      };
    });
    expect(
      layout.overflow,
      `horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(1);
    expect(layout.headingLines, `hero wrapping at ${width}px`).toBeLessThan(
      3.2,
    );
  }
});
