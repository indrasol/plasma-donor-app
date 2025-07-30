export const config = {
  production: true,
  //apiUrl: "http://adpcapi.nuram.xyz/api",
  // apiUrl: "http://192.168.2.142/NuRam/PlasmaDonorAPI/api",
  apiUrl: "http://localhost/NuRam/PlasmaDonorAPI/api",
  
  // Google Maps Configuration
  googleMaps: {
    apiKey: 'AIzaSyB8xP4kL2mW9qT3rN6v-J0hY5fM7cZ1nQ2', // Replace with your production API key
    libraries: ['places'],
    version: 'weekly',
    region: 'US',
    language: 'en'
  },
  
  application: {
    name: 'plasma-donar-app',
  }
};
