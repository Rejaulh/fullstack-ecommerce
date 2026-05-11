
export const saveToken = (token_access, token_refresh) => {
    localStorage.setItem('access_token', token_access);
    localStorage.setItem('refresh_token', token_refresh);
};

export const clearToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const authFetch = (url, options = {}) => {
    const token = getAccessToken();
    const headers = options.headers ? { ...options.headers } : {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(url, { ...options, headers });
};