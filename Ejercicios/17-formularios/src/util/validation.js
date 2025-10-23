export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value) {
  return value.length >= 4;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}