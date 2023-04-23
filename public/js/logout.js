const logout = async () => {
    // makes a request to this server enpoint
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
    });
    //If the response is okay then the page is redirected to the homepage
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

//When clicked the logout function above will be called
document.querySelector('#logout').addEventListener('click', logout);
