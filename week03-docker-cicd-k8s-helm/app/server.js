const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello, Kubernetes with GitLab CI/CD and Helm!');
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
