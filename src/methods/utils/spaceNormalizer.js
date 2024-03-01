const spaceNormalizer = (userInput, separators) => {
  let spaceNormalize = "";
  
  if (userInput) {
    spaceNormalize = userInput.replaceAll(" ", "").toLowerCase();

    separators.forEach((separator) => {
      const rg = new RegExp(`\\${separator}`, "g");
      spaceNormalize = spaceNormalize.replace(rg, ` ${separator} `);
    });
  }
  
  return spaceNormalize;
};

export default spaceNormalizer;
