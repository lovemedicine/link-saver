import { encrypt, decrypt } from './crypto';

describe('encryption', () => {
  const password = 'mypassword1234';
  const data = { foo: ['bar', 'baz'] };
  const plaintext = JSON.stringify(data);

  it('decrypting the cyphertext should return the plaintext', async () => {
    const cyphertext = await encrypt(password, plaintext);
    expect(await decrypt(password, cyphertext)).toEqual(plaintext);
  });
});
