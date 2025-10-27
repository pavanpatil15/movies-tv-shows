// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Entry {
  id: number;
  title: string;
  type: 'Movie' | 'TV_Show';
  director: string;
  budget?: string;
  location?: string;
  duration?: string;
  yearTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntryData {
  title: string;
  type: 'Movie' | 'TV_Show';
  director: string;
  budget?: string;
  location?: string;
  duration?: string;
  yearTime?: string;
}

export interface PaginatedResponse {
  data: Entry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export const entryApi = {
  getEntries: (page: number = 1, limit: number = 20) =>
    api.get<PaginatedResponse>(`/entries?page=${page}&limit=${limit}`),

  getEntry: (id: number) =>
    api.get<Entry>(`/entries/${id}`),

  createEntry: (data: CreateEntryData) =>
    api.post<Entry>('/entries', data),

  updateEntry: (id: number, data: Partial<CreateEntryData>) =>
    api.put<Entry>(`/entries/${id}`, data),

  deleteEntry: (id: number) =>
    api.delete(`/entries/${id}`),
};

export default api;