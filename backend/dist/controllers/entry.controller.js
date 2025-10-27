"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.createEntry = exports.getEntryById = exports.getAllEntries = void 0;
const client_1 = require("@prisma/client");
const entry_validator_1 = require("../validators/entry.validator");
const prisma = new client_1.PrismaClient();
const getAllEntries = async (req, res) => {
    try {
        const validation = entry_validator_1.paginationSchema.safeParse(req.query);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        const { page, limit } = validation.data;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const [entries, total] = await Promise.all([
            prisma.entry.findMany({
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.entry.count(),
        ]);
        res.json({
            data: entries,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
                hasMore: skip + entries.length < total,
            },
        });
    }
    catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ error: 'Failed to fetch entries' });
    }
};
exports.getAllEntries = getAllEntries;
const getEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await prisma.entry.findUnique({
            where: { id: parseInt(id) },
        });
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(entry);
    }
    catch (error) {
        console.error('Error fetching entry:', error);
        res.status(500).json({ error: 'Failed to fetch entry' });
    }
};
exports.getEntryById = getEntryById;
const createEntry = async (req, res) => {
    try {
        const validation = entry_validator_1.createEntrySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        const entry = await prisma.entry.create({
            data: validation.data,
        });
        res.status(201).json(entry);
    }
    catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({ error: 'Failed to create entry' });
    }
};
exports.createEntry = createEntry;
const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = entry_validator_1.updateEntrySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        const entry = await prisma.entry.update({
            where: { id: parseInt(id) },
            data: validation.data,
        });
        res.json(entry);
    }
    catch (error) {
        console.error('Error updating entry:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(500).json({ error: 'Failed to update entry' });
    }
};
exports.updateEntry = updateEntry;
const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.entry.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting entry:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.status(500).json({ error: 'Failed to delete entry' });
    }
};
exports.deleteEntry = deleteEntry;
