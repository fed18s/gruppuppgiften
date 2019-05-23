import app from './app';

const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
