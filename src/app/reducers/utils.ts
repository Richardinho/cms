export const updateLinks = (links, articleJSON) => {
  //todo: write test for this
  const id = articleJSON.id;
  const published = articleJSON.published;

  const index = links.findIndex(link => link.id === id);
  const articleLink = { ...links[index], published };

  links[index] = articleLink;

  return [...links];
};
