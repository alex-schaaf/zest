import { test, expect } from "@playwright/test"

const pageUrl = "http://localhost:5173/register"

test("has-register-form", async ({ page }) => {
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

test("has-password-confirmation-input", async ({ page }) => {
  await page.goto(pageUrl)
  const password = page.locator("input[name=passwordConfirm]")
  expect(await password.isVisible()).toBe(true)
})

test("has-disabled-submit-button", async ({ page }) => {
  await page.goto(pageUrl)
  const submit = page.locator("button[name=register]")
  expect(await submit.isVisible()).toBe(true)
  expect(await submit.isDisabled()).toBe(true)
})

test("has-login-link", async ({ page }) => {
  await page.goto(pageUrl)
  const register = page.locator("a[href='/login']")
  expect(await register.isVisible()).toBe(true)
})

test("has-enabled-submit-button", async ({ page }) => {
  await page.goto(pageUrl)
  const email = page.locator("input[name=email]")
  const password = page.locator("input[name=password]")
  const passwordConfirm = page.locator("input[name=passwordConfirm]")
  const submit = page.locator("button[name=register]")

  await email.fill("email@example.com")
  await password.fill("password")
  await passwordConfirm.fill("password")

  expect(await submit.isDisabled()).toBe(false)
})

test("has-disabled-submit-button-mismatched-passwords", async ({ page }) => {
  await page.goto(pageUrl)
  const email = page.locator("input[name=email]")
  const password = page.locator("input[name=password]")
  const passwordConfirm = page.locator("input[name=passwordConfirm]")
  const submit = page.locator("button[name=register]")

  await email.fill("email@example.com")
  await password.fill("password")
  await passwordConfirm.fill("differentPassword")

  expect(await submit.isDisabled()).toBe(true)
})
