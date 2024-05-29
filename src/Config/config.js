const config = {
    appVersion: process.env.REACT_APP_PROJECT_APP_VERSION,
    backendUrl: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : process.env.REACT_APP_DEV_BACKEND_URL
};

export default config;
