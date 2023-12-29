export function getFirstLetters(str: string = "") {
  // Split the string into an array of words
  const words = str.split(" ");

  // Extract the first letter of each word
  const firstLetters = words.map((word) => word.charAt(0));

  // Join the first letters into a new string
  const result = firstLetters.join("");

  return result;
}

export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}
