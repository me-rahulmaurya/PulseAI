const timestamp = () =>
  new Date().toLocaleString("en-IN", {
    hour12: false,
  });

const print = (color, type, message) => {
  console.log(`${color}[${timestamp()}] ${type} ${message}\x1b[0m`);
};

const logger = {
    info: (msg) =>
        print("\x1b[36m", "ℹ INFO", msg),

    success: (msg) =>
        print("\x1b[32m", "✔ SUCCESS", msg),

    warn: (msg) =>
        print("\x1b[33m", "⚠ WARNING", msg),

    error: (msg) =>
        print("\x1b[31m", "✖ ERROR", msg),
};

export default logger;