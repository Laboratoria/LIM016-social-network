export default () => {
  const viewDifferent = `
    <h1> 404 </h1>
    <h2>Página no encontrada</h2>
    <p>El archivo especificado no se encontró en este sitio web.Por favor compruebe la URL 
    para errores y vuelva a intentarlo.</p>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'content');
  divElement.innerHTML = viewDifferent;
  return divElement;
};
