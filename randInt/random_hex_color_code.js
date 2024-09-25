/* program to generate a random hexadecimal color code.

The random_hex_color_code function generates random hexadecimal color codes, 
which can be applied in various real-world applications, especially in web development, graphic design, and data visualization.

Use Math.random() to generate a random 24-bit (6 * 4bits) hexadecimal number.
Use bit shifting and then convert it to an hexadecimal string using Number.prototype.toString(16).*/

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

console.log(random_hex_color_code())

//Example 1: In web apps to change the background color dynamically for aesthetic purposes or to enhance user experience.
document.body.style.backgroundColor = random_hex_color_code();
