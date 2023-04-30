import { createClient } from 'redis';
const client = createClient();
client.on('error', (err): void => {
    console.log(err);
    console.log('Redis Client Error');
    process.exit(1);
});
client.on('connect', (): void => {
    console.log('Redis plugged in.');
});
export default client;
