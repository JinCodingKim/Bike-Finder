module.exports = {
  getUserByAuthId: (req, res) => {
    const db = req.app.get("db");
    const { auth_id } = req.user;
    db
      .getUserByAuthId(auth_id)
      .then(logged => res.status(200).json(logged))
      .catch(err => res.status(500).json(err));
  }
};
