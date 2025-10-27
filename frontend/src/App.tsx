// src/App.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { entryApi, CreateEntryData } from './services/api';
import { Entry, FormData } from './types';
import EntriesTable from './components/EntriesTable';
import EntryForm from './components/EntryForm';
import DeleteModal from './components/DeleteModal';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<Entry | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch entries
  const fetchEntries = useCallback(async (pageNum: number, append: boolean = true) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await entryApi.getEntries(pageNum, 20);
      const { data, pagination } = response.data;
      
      setEntries(prev => append ? [...prev, ...data] : data);
      setHasMore(pagination.hasMore);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchEntries(1, false);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchEntries(page, true);
    }
  }, [page]);

  // Handle form submission
  const handleSubmit = async (data: FormData) => {
    const payload: CreateEntryData = {
      title: data.title,
      type: data.type,
      director: data.director,
      budget: data.budget || undefined,
      location: data.location || undefined,
      duration: data.duration || undefined,
      yearTime: data.yearTime || undefined,
    };

    if (editEntry) {
      await entryApi.updateEntry(editEntry.id, payload);
    } else {
      await entryApi.createEntry(payload);
    }

    // Refresh list
    setPage(1);
    setEntries([]);
    await fetchEntries(1, false);
    setShowForm(false);
    setEditEntry(null);
  };

  // Handle edit
  const handleEdit = (entry: Entry) => {
    setEditEntry(entry);
    setShowForm(true);
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!deleteEntry) return;

    setDeleteLoading(true);
    try {
      await entryApi.deleteEntry(deleteEntry.id);
      setEntries(prev => prev.filter(e => e.id !== deleteEntry.id));
      setDeleteEntry(null);
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditEntry(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Favorite Movies & TV Shows
          </h1>
          <p className="text-gray-600">
            Manage your collection of favorite entertainment
          </p>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            Add New Entry
          </button>
        </div>

        {/* Loading State */}
        {initialLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          <>
            {/* Table */}
            <EntriesTable
              entries={entries}
              onEdit={handleEdit}
              onDelete={(entry) => setDeleteEntry(entry)}
              loading={loading}
            />

            {/* Infinite Scroll Loader */}
            {hasMore && entries.length > 0 && (
              <div
                ref={observerTarget}
                className="flex justify-center py-8"
              >
                {loading && (
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                )}
              </div>
            )}

            {/* End Message */}
            {!hasMore && entries.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                You've reached the end of the list
              </div>
            )}
          </>
        )}

        {/* Form Modal */}
        {showForm && (
          <EntryForm
            onSubmit={handleSubmit}
            onClose={handleCloseForm}
            initialData={editEntry || undefined}
            isEdit={!!editEntry}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteEntry && (
          <DeleteModal
            title={deleteEntry.title}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteEntry(null)}
            loading={deleteLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;