// Importando funciones de firesbase
import {
  createUserWithEmailAndPassword,

} from '../src/lib/firebase/config.js';

// Importando las funciones que vamos a testear
import {
  createUser,
} from '../src/lib/firebase/auth.js';

jest.mock('../src/lib/firebase/auth.js');

describe('Registrando a un usuario', () => {
  it('deberia ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => createUser('front@end.la', '123456')
    .then(() => {
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('front@end.la');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    }));
});
