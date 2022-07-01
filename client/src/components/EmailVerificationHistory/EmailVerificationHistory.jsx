import React from 'react';
import axios from 'axios';

function callServer() {
  axios.get(`http://localhost:8000/email-verifications`, {}).then((response) => {
    console.log(response.data);
  });
}

export function EmailVerificationHistory() {
  return (
    <div>
      <h1>Email Verification History 1</h1>
      {callServer()}
    </div>
  );
}
