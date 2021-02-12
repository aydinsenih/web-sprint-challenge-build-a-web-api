// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
    Projects.get()
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.get("/:id", mw.validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.get(id)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.post("/", mw.validateProject, (req, res) => {
    Projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.put("/:id", mw.validateProject, mw.validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.update(id, req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.delete("/:id", mw.validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(() => {
            res.status(204).json({});
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

module.exports = router;
