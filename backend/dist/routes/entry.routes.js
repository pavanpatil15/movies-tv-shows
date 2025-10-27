"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/entry.routes.ts
const express_1 = require("express");
const entry_controller_1 = require("../controllers/entry.controller");
const router = (0, express_1.Router)();
router.get('/', entry_controller_1.getAllEntries);
router.get('/:id', entry_controller_1.getEntryById);
router.post('/', entry_controller_1.createEntry);
router.put('/:id', entry_controller_1.updateEntry);
router.delete('/:id', entry_controller_1.deleteEntry);
exports.default = router;
