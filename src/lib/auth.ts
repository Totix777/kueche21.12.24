// Simple local authentication
export async function login(username: string, password: string) {
  if (password !== 'Melm3') {
    throw new Error('Falsches Passwort');
  }
  
  localStorage.setItem('username', username);
  return true;
}

export async function logout() {
  localStorage.removeItem('username');
  return true;
}