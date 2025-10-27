"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.updateEntrySchema = exports.createEntrySchema = void 0;
// src/validators/entry.validator.ts
const zod_1 = require("zod");
exports.createEntrySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(255),
    type: zod_1.z.enum(['Movie', 'TV_Show'], {
        errorMap: () => ({ message: 'Type must be either Movie or TV_Show' })
    }),
    director: zod_1.z.string().min(1, 'Director is required').max(255),
    budget: zod_1.z.string().max(100).optional(),
    location: zod_1.z.string().max(255).optional(),
    duration: zod_1.z.string().max(100).optional(),
    yearTime: zod_1.z.string().max(100).optional(),
});
exports.updateEntrySchema = exports.createEntrySchema.partial();
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.string().optional().default('1'),
    limit: zod_1.z.string().optional().default('20'),
});
