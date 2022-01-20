const auth = jest.fn();

const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

export { auth, createUserWithEmailAndPassword };
