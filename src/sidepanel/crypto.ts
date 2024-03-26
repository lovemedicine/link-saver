const salt = new Uint8Array([
  102, 80, 139, 141, 171, 112, 165, 5, 201, 23, 109, 242, 236, 27, 38, 92,
]);
const iv = new Uint8Array([
  100, 107, 192, 175, 79, 9, 182, 41, 101, 211, 46, 21,
]);

function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
}

async function getKey(password: string) {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    await getKeyMaterial(password),
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(
  password: string,
  plaintext: string
): Promise<string> {
  const enc = new TextEncoder();
  const key = await getKey(password);

  const encoded = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  return btoa(String.fromCharCode(...new Uint8Array(encoded)));
}

export async function decrypt(
  password: string,
  ciphertext: string
): Promise<string> {
  const dec = new TextDecoder();
  const key = await getKey(password);
  const array = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

  const encoded = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    array
  );

  return dec.decode(encoded);
}
