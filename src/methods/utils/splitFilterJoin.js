// organizes total for various items
const splitFilterJoin = (total, depth) => {
  const s = total.split(/(?!\(.*)\s(?![^(]*?\))/g);
  const sf = s.filter((value) => !value.includes("d"));
  const sfj = sf.join(" ");

  switch (depth) {
    case 1:
      return s;
    case 2:
      return sf;
    case 3:
      return sfj;
    default:
      return total;
  }
};

export default splitFilterJoin;