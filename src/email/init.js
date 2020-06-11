import {SocketLabsClient} from '@socketlabs/email';
const client = new SocketLabsClient(
  parseInt(process.env.SOCKETLABS_SERVER_ID),
  process.env.SOCKETLABS_INJECTION_API_KEY
);
export default client