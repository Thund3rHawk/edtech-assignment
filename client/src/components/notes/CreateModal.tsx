'use client';

import { useState } from 'react';
import { useCreateNote } from '@/hooks/useNotes';
import { useFolders } from '@/hooks/useFolders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Plus } from 'lucide-react';

interface CreateNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultFolderId?: string;
  onNoteCreated?: (noteId: string) => void;
}

export function CreateNoteModal({ 
  open, 
  onOpenChange, 
  defaultFolderId,
  onNoteCreated 
}: CreateNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(defaultFolderId || '');
  
  const createNote = useCreateNote();
  const { data: folders } = useFolders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      const note = await createNote.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        folderId: selectedFolderId || undefined,
      });

      // Reset form
      setTitle('');
      setContent('');
      setSelectedFolderId('');
      
      // Close modal
      onOpenChange(false);
      
      // Callback with created note ID
      if (onNoteCreated) {
        onNoteCreated(note.id);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create note');
    }
  };

  const handleClose = () => {
    if (!createNote.isPending) {
      setTitle('');
      setContent('');
      setSelectedFolderId('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Add a new note to your collection
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              disabled={createNote.isPending}
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note..."
              className="min-h-[200px] resize-none"
              disabled={createNote.isPending}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Folder (Optional)</label>
            <select
              value={selectedFolderId}
              onChange={(e) => setSelectedFolderId(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              disabled={createNote.isPending}
            >
              <option value="">No folder</option>
              {folders?.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createNote.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createNote.isPending}>
              {createNote.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}