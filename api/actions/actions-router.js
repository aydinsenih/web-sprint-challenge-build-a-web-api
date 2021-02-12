// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
    Actions.get()
        .then((actions) => {
            res.status(200).json(actions);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.get("/:id", mw.validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.post("/", mw.validateAction, mw.validateActionsProjectId, (req, res) => {
    Actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action);
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

router.put(
    "/:id",
    mw.validateAction,
    mw.validateActionId,
    mw.validateActionsProjectId,
    (req, res) => {
        const id = req.params.id;
        Actions.update(id, req.body)
            .then((action) => {
                res.status(201).json(action);
            })
            .catch((err) => {
                res.status(500).json({ message: " Server error: " + err });
            });
    }
);

router.delete("/:id", mw.validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.update(id, req.body)
        .then(() => {
            res.status(204).json({});
        })
        .catch((err) => {
            res.status(500).json({ message: " Server error: " + err });
        });
});

module.exports = router;
