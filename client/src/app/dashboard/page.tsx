'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { CreateNoteModal } from '@/components/notes/CreateModal';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

export default function Page() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId') || undefined;
  const isPinned = searchParams.get('pinned') === 'true';
  
  const { data: notes, isLoading } = useNotes(folderId);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const filteredNotes = isPinned 
    ? notes?.filter(note => note.isPinned)
    : notes;

  const handleNoteCreated = (noteId: string) => {
    // Open the editor with the newly created note
    setSelectedNoteId(noteId);
    setShowEditor(true);
  };

  if (showEditor && selectedNoteId) {
    return (
      <NoteEditor
        noteId={selectedNoteId}
        onClose={() => {
          setShowEditor(false);
          setSelectedNoteId(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {isPinned ? 'Pinned Notes' : 'All Notes'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredNotes?.length || 0} notes
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredNotes && filteredNotes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => {
                setSelectedNoteId(note.id);
                setShowEditor(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">No notes yet</p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create your first note
          </Button>
        </div>
      )}

      {/* Create Note Modal */}
      <CreateNoteModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        defaultFolderId={folderId}
        onNoteCreated={handleNoteCreated}
      />
    </div>
  );
}