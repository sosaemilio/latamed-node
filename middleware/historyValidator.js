const historyAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'You are not authorized to carry out these types of actions' });
  };
  
  module.exports = { historyAuthenticated };