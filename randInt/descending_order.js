function descendingOrder() {
   let num = 209482;
   let arr_num = Array.from(num + "");
   arr_num = arr_num.map(e => parseInt(e));
   arr_num.sort();
   arr_num.reverse();
   arr_num.sort((a, b) => a - b);
   let str_arr = arr_num.join("");

   return str_arr;
}

console.log(descendingOrder()); //022489
