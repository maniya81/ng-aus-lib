import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Creates a validator that verifies Australian Business Numbers (ABNs) according to the official modulus 89 algorithm.
 */
export function abnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value == null || value === '') {
      return null; // Do not validate empty values; let required validator handle if needed.
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
      return { abn: { reason: 'nonNumeric' } };
    }

    const sanitized = String(value).replace(/[\s-]+/g, '');

    if (!/^\d+$/.test(sanitized)) {
      return { abn: { reason: 'nonNumeric' } };
    }

    if (sanitized.length !== 11) {
      return { abn: { reason: 'length', actualLength: sanitized.length } };
    }

    const digits = sanitized.split('').map((d) => Number(d));

    // Official weighting factors for positions 1..11
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    // Subtract 1 from the first digit per the algorithm
    digits[0] -= 1;

    const weightedSum = digits.reduce((sum, digit, index) => sum + digit * weights[index], 0);

    if (weightedSum % 89 !== 0) {
      return { abn: { reason: 'checksum' } };
    }

    return null;
  };
}
