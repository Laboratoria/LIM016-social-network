import { stateChange } from '../lib/firebase/auth.js'

const profile = () => {
  const viewProfile = `
    <h1> viewProfile </h1>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'content');
  divElement.innerHTML = viewProfile;
  return divElement;
};

export {
  profile,
};
