const news = () => {
  const viewNews = `
    <h1> viewNews </h1>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'content');
  divElement.innerHTML = viewNews;
  return divElement;
};

export {
  news,
};
