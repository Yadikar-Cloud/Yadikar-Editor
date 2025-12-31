window.googleAccessToken = null;
window.googleApiKey = null;
let gapiInited = false;

// Initialize cloudProviders if not exists
if (!window.cloudProviders) {
    window.cloudProviders = {
        google: {
            name: 'Google Drive',
            icon: '📁',
            authUrl: '/auth/google',
            tokenUrl: '/api/google/token',
            logoutUrl: '/auth/google/logout',
            authenticated: false,
            token: null,
            apiKey: null
        }
    };
}

// Initialize Google API
function gapiLoaded() {
    gapi.load('client:picker', async () => {
        // Get API key from backend
        const response = await fetch('/api/google/token');
        const data = await response.json();
        
        window.googleApiKey = data.api_key;
        window.googleAccessToken = data.token;
        
        // Update cloudProviders
        window.cloudProviders.google.token = data.token;
        window.cloudProviders.google.apiKey = data.api_key;
        window.cloudProviders.google.authenticated = data.authenticated || false;
        
        await gapi.client.init({
            apiKey: data.api_key,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        });
        
        if (data.token) {
            gapi.client.setToken({ access_token: data.token });
        }
        
        gapiInited = true;
        console.log('Google auth initialized:', data.authenticated ? 'Authenticated' : 'Not authenticated');
    });
}

// Sign in function - redirects to Laravel OAuth
window.signInWithGoogle = function() {
    window.location.href = '/auth/google';
};

// Auto-initialize on page load
window.addEventListener('load', function() {
    gapiLoaded();
});
