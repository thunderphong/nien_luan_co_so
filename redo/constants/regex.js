// Does not allow these characters in a string: #$%^&amp;*()'
const NO_SPECIAL_CHAR = /^(a-z|A-Z|0-9)*[^#$%^&*()']*$/g;
