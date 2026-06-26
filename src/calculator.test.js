import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './calculator.js';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('складывает два положительных числа', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('складывает отрицательные числа', () => {
      expect(calculator.add(-4, -6)).toBe(-10);
    });

    it('складывает положительное и отрицательное число', () => {
      expect(calculator.add(10, -3)).toBe(7);
    });

    it('возвращает второе число при сложении с нулём', () => {
      expect(calculator.add(0, 42)).toBe(42);
    });

    it('корректно складывает дробные числа', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.add('2', 3)).toThrow(TypeError);
      expect(() => calculator.add(2, null)).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает ошибку при NaN', () => {
      expect(() => calculator.add(NaN, 1)).toThrow('Аргументы не должны быть NaN');
    });
  });

  describe('subtract', () => {
    it('вычитает два положительных числа', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    it('возвращает отрицательный результат', () => {
      expect(calculator.subtract(3, 8)).toBe(-5);
    });

    it('вычитает отрицательное число', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
    });

    it('возвращает исходное число при вычитании нуля', () => {
      expect(calculator.subtract(7, 0)).toBe(7);
    });

    it('корректно вычитает дробные числа', () => {
      expect(calculator.subtract(1.5, 0.5)).toBeCloseTo(1);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.subtract(undefined, 5)).toThrow(TypeError);
    });

    it('выбрасывает ошибку при NaN', () => {
      expect(() => calculator.subtract(5, NaN)).toThrow('Аргументы не должны быть NaN');
    });
  });

  describe('multiply', () => {
    it('умножает два положительных числа', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });

    it('умножает отрицательные числа', () => {
      expect(calculator.multiply(-3, -4)).toBe(12);
    });

    it('возвращает отрицательный результат при умножении чисел разных знаков', () => {
      expect(calculator.multiply(-2, 6)).toBe(-12);
    });

    it('возвращает ноль при умножении на ноль', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    it('корректно умножает дробные числа', () => {
      expect(calculator.multiply(0.2, 0.3)).toBeCloseTo(0.06);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.multiply(2, '3')).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает ошибку при NaN', () => {
      expect(() => calculator.multiply(NaN, 2)).toThrow('Аргументы не должны быть NaN');
    });
  });

  describe('divide', () => {
    it('делит два положительных числа', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('делит отрицательное число на положительное', () => {
      expect(calculator.divide(-8, 2)).toBe(-4);
    });

    it('делит на дробное число', () => {
      expect(calculator.divide(1, 4)).toBe(0.25);
    });

    it('возвращает ноль при делении нуля на число', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    it('выбрасывает ошибку при делении на ноль', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Деление на ноль невозможно');
    });

    it('выбрасывает ошибку при делении на ноль, когда делимое тоже ноль', () => {
      expect(() => calculator.divide(0, 0)).toThrow('Деление на ноль невозможно');
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.divide(10, '2')).toThrow(TypeError);
    });

    it('выбрасывает ошибку при NaN', () => {
      expect(() => calculator.divide(NaN, 2)).toThrow('Аргументы не должны быть NaN');
    });
  });
});
