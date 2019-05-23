const mockApp = () => {
  const app = {};
  app.get = jest.fn();
  app.post = jest.fn();
  return app;
};

export default mockApp;
