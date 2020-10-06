module.exports = (app, wagner) => {
  // Gives list of jobs that are in the system with all details
  app.get('/api/jobs', async (req, res) => {});

  // Create a post
  app.post('/api/jobs', async (req, res) => {});

  // Get Information about a specific jobs
  app.get('/api/jobs/:jobid', async (req, res) => {});

  // Edit Information of a job
  // Can edit only specific parts of the job description
  app.patch('/api/jobs/:jobid', async (req, res) => {});

  // Delete a job and terminate the job
  app.delete('/api/jobs/:jobid', async (req, res) => {});
};
