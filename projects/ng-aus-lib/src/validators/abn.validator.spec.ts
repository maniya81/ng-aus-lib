import { FormControl } from '@angular/forms';

import { abnValidator } from './abn.validator';

describe('abnValidator', () => {
  const validator = abnValidator();
  const validAbn = '51824753556';

  function validate(value: unknown) {
    const control = new FormControl(value);
    return validator(control);
  }

  it('accepts a valid ABN without formatting', () => {
    expect(validate(validAbn)).toBeNull();
  });

  it('accepts a valid ABN with spaces', () => {
    expect(validate('51 824 753 556')).toBeNull();
  });

  it('rejects an ABN with an incorrect checksum', () => {
    expect(validate('51824753557')).toEqual({ abn: { reason: 'checksum' } });
  });

  it('rejects ABNs that are too short', () => {
    expect(validate('1234567890')).toEqual({ abn: { reason: 'length', actualLength: 10 } });
  });

  it('rejects ABNs that are too long', () => {
    expect(validate('123456789012')).toEqual({ abn: { reason: 'length', actualLength: 12 } });
  });

  it('rejects non-numeric ABNs', () => {
    expect(validate('83 015 706 26A')).toEqual({ abn: { reason: 'nonNumeric' } });
  });
});
