//Form handler for the login
  const loginFormHandler = async (event) => {
    //Prevent reload
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('\n\nIS response okay?:  ', response);

      if (response.ok) {
        document.location.replace('/');
      } else {
        console.log(`Login failed with status ${response.status} (${response.statusText})`);
        alert('Failed to log in.');
      }
    }
  };

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
