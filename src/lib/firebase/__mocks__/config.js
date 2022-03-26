// mockeando auth
export const auth = jest.fn();

// mockeando estado de cambio de un usuario.
export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));

// mockeando para crear un usuario
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

// mockeando el envio de un email de verificación
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));

// mockeando inicio de sesión
export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

// mockeando cerrar sesión
export const signOut = jest.fn(() => Promise.resolve({}));

// mockeando la inicio de sesión con google, facebook y github
export const signInWithPopup = jest.fn((_auth_, provider) => Promise.resolve({ provider }));

// mockeando función de restablecimiento de contraseña
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

// mockeando la  funciones de firestore
// mockeando la base de datos
export const db = jest.fn();

// mokendo collection
export const collection = jest.fn((_db_, _collection_) => _collection_);

// mockeando addDoc
export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));
