const express = require('express');

const router = express.Router();

/* eslint-disable-next-line no-unused-vars */
router.post('/', (req, res, next) => {
  const { teamName } = req.body;

  if (
    teamName &&
    process.env.TEAM_NAME &&
    process.env.TEAM_NAME.indexOf(teamName) >= 0
  )
    res.status(200).send({ response: `${teamName} is part of the team!` });
  else
    res.status(400).send({
      response: `${teamName} is not part of the team. Modify your .env`,
    });
});

module.exports = router;
