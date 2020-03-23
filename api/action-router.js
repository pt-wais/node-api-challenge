/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const actionData = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  actionData.get()
    .then((hub) => {
      res.status(200).json(hub);
    }).catch((err) => {
      res.status(500).json({ error: 'not working' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionData.get(id)
    .then((hub) => {
      res.status(200).json(hub);
    }).catch((err) => {
      res.status(500).json({ error: 'not working' });
    });
});

router.post('/', (req, res) => {
  const newpost = req.body;

  actionData.insert(newpost)
    .then((hub) => {
      res.status(200).json(hub);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  actionData.update(id, updated)
    .then((hub) => {
      if (!id) {
        res.status(404).json({ message: 'does not exist' });
      } else if ((!req.body.description)) {
        res.status(400).json({ errorMessage: 'please enter a description to modify' });
      } else {
        res.status(200).json(hub);
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionData.remove(id)
    .then((hub) => {
      if (!req.params.id) {
        res.status(404).json({ message: 'Id not found' });
      } else {
        res.status(204).json({ message: 'deleted' });
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
