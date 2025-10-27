// src/types/index.ts
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

export interface FormData {
  title: string;
  type: 'Movie' | 'TV_Show';
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
}