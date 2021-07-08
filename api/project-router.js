/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const projectData = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
  projectData.get()
    .then((hub) => {
      res.status(201).json(hub);
    }).catch((error) => {
      res.status(500).json({ error: 'there was a server Error' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectData.get(id)
    .then((hub) => {
      res.status(200).json(hub);
    }).catch((err) => {
      res.status(500).json({ error: 'no work' });
    });
});


router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  projectData.getProjectActions(id)
    .then((hub) => {
      res.status(200).json(hub);
    }).catch((err) => {
      res.status(500).json({ error: 'didnt work' });
    });
});

router.post('/', (req, res) => {
  const inserted = req.body;
  projectData.insert(inserted).then((hub) => {
    res.status(200).json(hub);
  }).catch((error) => {
    res.status(500).json({ error: 'there was a server Error' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  projectData.update(id, updated).then((hub) => {
    if (!id) {
      res.status(404).json({ message: 'does not exist' });
    } else if ((!req.body.name || !req.body.description)) {
      res.status(400).json({ errorMessage: 'please enter a title and description to modify' });
    } else {
      res.status(200).json(hub);
    }
  }).catch((error) => {
    res.status(500).json(error);
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  projectData.remove(id).then((hub) => {
    if (!req.params.id) {
      res.status(404).json({ message: 'Id not found' });
    } else {
      res.status(204).json({ message: 'Your posts has successfully been deleted.' });
    }
  }).catch((error) => {
    res.status(500).json({ err: 'server broke down' });
  });
});


module.exports = router;
