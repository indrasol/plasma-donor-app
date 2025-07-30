export const config = {
  production: false,
  apiUrl: "https://localhost:44361/api",
  
  // Google Maps Configuration
  googleMaps: {
    apiKey: 'AIzaSyB8xP4kL2mW9qT3rN6v-J0hY5fM7cZ1nQ2', // Replace with your new development API key
    libraries: ['places'],
    version: 'weekly',
    region: 'US',
    language: 'en'
  },
  
  application: {
    name: 'plasma-donar-app',
  }
};
