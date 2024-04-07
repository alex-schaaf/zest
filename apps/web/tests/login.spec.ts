import { test, expect } from "@playwright/test"

const pageUrl = "http://localhost:5173/login"

test("has-title", async ({ page }) => {
  await page.goto(pageUrl)
  const title = page.locator("title")
  expect(await title.textContent()).toBe("🍋 Zest")
})

test("has-login-form", async ({ page }) => {
  await page.goto(pageUrl)
  const form = page.locator("form")
  expect(await form.isVisible()).toBe(true)
})

test("has-email-input", async ({ page }) => {
  await page.goto(pageUrl)
  const email = page.locator("input[name=email]")
  expect(await email.isVisible()).toBe(true)
})

test("has-password-input", async ({ page }) => {
  await page.goto(pageUrl)
  const password = page.locator("input[name=password]")
  expect(await password.isVisible()).toBe(true)
})

test("has-disabled-submit-button", async ({ page }) => {
  await page.goto(pageUrl)
  const submit = page.locator("button[name=signIn]")
  expect(await submit.isVisible()).toBe(true)
  expect(await submit.isDisabled()).toBe(true)
})

test("has-register-link", async ({ page }) => {
  await page.goto(pageUrl)
  const register = page.locator("a[href='/register']")
  expect(await register.isVisible()).toBe(true)
})

test("has-enabled-submit-button", async ({ page }) => {
  await page.goto(pageUrl)
  const email = page.locator("input[name=email]")
  const password = page.locator("input[name=password]")
  const submit = page.locator("button[name=signIn]")

  await email.fill("email@example.com")
  await password.fill("password")

  expect(await submit.isDisabled()).toBe(false)
})
