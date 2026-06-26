import { test, expect } from '@playwright/test';

const display = (page) => page.locator('#display');

async function clickDigit(page, digit) {
  await page.getByRole('button', { name: digit, exact: true }).click();
}

async function clickOperator(page, operator) {
  await page.getByRole('button', { name: operator, exact: true }).click();
}

async function clickEquals(page) {
  await page.getByRole('button', { name: '=', exact: true }).click();
}

async function enterNumber(page, number) {
  for (const char of String(number)) {
    if (char === '.') {
      await page.getByRole('button', { name: '.', exact: true }).click();
    } else {
      await clickDigit(page, char);
    }
  }
}

test.describe('Калькулятор в браузере', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator.html');
  });

  test('отображает начальное значение 0', async ({ page }) => {
    await expect(display(page)).toHaveText('0');
  });

  test('вводит однозначное число', async ({ page }) => {
    await clickDigit(page, '5');

    await expect(display(page)).toHaveText('5');
  });

  test('вводит многозначное число', async ({ page }) => {
    await enterNumber(page, '123');

    await expect(display(page)).toHaveText('123');
  });

  test('вводит дробное число', async ({ page }) => {
    await enterNumber(page, '3.14');

    await expect(display(page)).toHaveText('3.14');
  });

  test('складывает два числа', async ({ page }) => {
    await enterNumber(page, '12');
    await clickOperator(page, '+');
    await enterNumber(page, '8');
    await clickEquals(page);

    await expect(display(page)).toHaveText('20');
  });

  test('вычитает два числа', async ({ page }) => {
    await enterNumber(page, '15');
    await clickOperator(page, '-');
    await enterNumber(page, '7');
    await clickEquals(page);

    await expect(display(page)).toHaveText('8');
  });

  test('умножает два числа', async ({ page }) => {
    await enterNumber(page, '6');
    await clickOperator(page, '×');
    await enterNumber(page, '7');
    await clickEquals(page);

    await expect(display(page)).toHaveText('42');
  });

  test('делит два числа', async ({ page }) => {
    await enterNumber(page, '20');
    await clickOperator(page, '/');
    await enterNumber(page, '4');
    await clickEquals(page);

    await expect(display(page)).toHaveText('5');
  });

  test('показывает ошибку при делении на ноль', async ({ page }) => {
    await enterNumber(page, '10');
    await clickOperator(page, '/');
    await enterNumber(page, '0');
    await clickEquals(page);

    await expect(display(page)).toHaveText('Ошибка');
  });

  test('очищает дисплей кнопкой C', async ({ page }) => {
    await enterNumber(page, '999');
    await page.getByRole('button', { name: 'C', exact: true }).click();

    await expect(display(page)).toHaveText('0');
  });

  test('выполняет цепочку операций после результата', async ({ page }) => {
    await enterNumber(page, '5');
    await clickOperator(page, '+');
    await enterNumber(page, '3');
    await clickEquals(page);

    await expect(display(page)).toHaveText('8');

    await clickOperator(page, '×');
    await enterNumber(page, '2');
    await clickEquals(page);

    await expect(display(page)).toHaveText('16');
  });
});
