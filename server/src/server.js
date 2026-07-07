import http from "http";

import app from "./app.js";

import config from "./core/config/env.js";

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`
=================================================

🚀 PulseAI Server Started

Environment : ${config.nodeEnv}

Port        : ${config.port}

=================================================
`);
});
