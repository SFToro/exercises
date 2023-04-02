// @ts-check
import { test, expect } from "@playwright/test";

const URL = "http://localhost:5175";
// const IMG_ENDPOINT = "https://cataas.com/cat/says/";

test("has title", async ({ page }) => {
  await page.goto(URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React gatitos/);
});

test("app shows random fact and image", async ({ page }) => {
  await page.goto(URL);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("alt");

  console.log({ textContent, imageSrc });

  // const builtSrc = `${IMG_ENDPOINT}${textContent
  //   ?.split(" ", 3)
  //   .join(" ")}?size=25&color=red&json=true`;
  // console.log(imageSrc);

  // await expect(builtSrc).toBe(imageSrc);
});
