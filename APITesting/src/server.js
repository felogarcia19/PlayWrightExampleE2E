import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`API testing server running on http://localhost:${config.port}`);
});
