export const ENV = 'dev';
export const backendUrl = 'https://api-dev.empowerofyou.com/api/';
// export const backendUrl = 'http://localhost:8080/api/';
// export const backendUrl = 'http://192.168.1.5:8080/api/';

//web socket
// export const cleanBackendUrl = `wss://${
//   backendUrl.split('api')[0].split('//')[1]
// }`;

//long polling
export const cleanBackendUrl = backendUrl.split('api')[0];
// export const cleanBackendUrl = 'wss://192.168.1.5:8080/';
