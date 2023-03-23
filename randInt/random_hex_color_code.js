// program to generate a random hexadecimal color code.

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

console.log(random_hex_color_code())

/* Use Math.random() to generate a random 24-bit (6 * 4bits) hexadecimal number.
Use bit shifting and then convert it to an hexadecimal string using Number.prototype.toString(16). */
