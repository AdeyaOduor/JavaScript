//Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. 
//You should return an array of all the anagrams or an empty array if there are none//return words.

function findAnagrams(word, words) {
  return words.filter(function (e) {
    return e.split('').sort().join('') === word.split('').sort().join('');
  });
}

const groupAnagrams = (strArr) => {
  if (strArr === undefined) {
    return 'where is your anagram?';
  } else {
    let mapStrArr = strArr.map((string) => {
      return {
        original: string,
        sorted: string.split('').sort().join('')
      };
    });

    mapStrArr.sort((a, b) => {
      return a.sorted < b.sorted ? 1 : -1;
    });

    const answer = mapStrArr.map((mapStr) => {
      return mapStr.original;
    });

    return answer;
  }
};

/* TEST */

const inputAnagrams = [
  'motherinlaw', 'debit card', 'dormitory', 'theearthquakes', 'astronomer', 'punishments', 'schoolmaster', 'hitlerwoman',
  'badcredit','dirtyroom','thequeershakes', 'moonstarrer','ninethumps','theclassroom'
];

const sortedAnagrams = [
  "ninethumps", "punishments", "dormitory", "dirtyroom", "astronomer", "moonstarrer", "motherinlaw", "hitlerwoman", 
  "thequeershakes", "schoolmaster", "theclassroom", "badcredit", "theearthquake", "debit card"
];

// groupAnagrams can be called
console.log(groupAnagrams() === 'where is your anagram?');

// groupAnagrams can be sorted
console.log(JSON.stringify(groupAnagrams(inputAnagrams)) === JSON.stringify(sortedAnagrams));
