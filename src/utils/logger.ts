const logger = (message: string): void => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export default logger;
