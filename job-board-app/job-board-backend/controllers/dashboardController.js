const dashboardController = (req, res) => {
  res.json({ email: req.user.email });
};

module.exports = dashboardController;
