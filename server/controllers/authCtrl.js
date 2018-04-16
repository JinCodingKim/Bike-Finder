module.exports = {
  getUserByAuthId: (req, res) => {
    const db = req.app.get("db");
    const { auth_id } = req.user;
    db
      .get_user_by_auth_id(auth_id)
      .then(logged => {
        res.status(200).json(logged[0]);
      })
      .catch(err => res.status(500).json(err));
  }
};
