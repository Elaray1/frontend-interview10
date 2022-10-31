export const getEmailVerifications = () => {
  return fetch('http://localhost:8000/email-verifications').then((response) => response.json());
}

export const addEmailVerification = (email) => {
  return fetch(`http://localhost:8000/email-verification`, {
    method: 'post',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json());
}