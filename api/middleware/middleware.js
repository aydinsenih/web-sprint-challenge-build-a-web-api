const Project = require("../projects/projects-model");
const Actions = require("../actions/actions-model");

async function validateActionsProjectId(req, res, next) {
    const { project_id } = req.body;
    try {
        const project = await Project.get(project_id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: " Server error: " + err });
    }
}

async function validateProjectId(req, res, next) {
    const id = req.params.id;
    try {
        const project = await Project.get(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: " Server error: " + err });
    }
}

async function validateActionId(req, res, next) {
    const id = req.params.id;
    try {
        const project = await Actions.get(id);
        if (!project) {
            res.status(404).json({ message: "Action not found" });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: " Server error: " + err });
    }
}

async function validateProject(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "missing required field(s)" });
    } else {
        next();
    }
}

async function validateAction(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (
        !req.body.project_id ||
        !req.body.description ||
        !req.body.notes
    ) {
        res.status(400).json({ message: "missing required field(s)" });
    } else {
        next();
    }
}

module.exports = {
    validateActionsProjectId,
    validateProjectId,
    validateActionId,
    validateProject,
    validateAction,
};
