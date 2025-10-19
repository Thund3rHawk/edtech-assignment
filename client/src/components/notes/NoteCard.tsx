'use client';

import { Note } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTogglePin, useDeleteNote } from '@/hooks/useNotes';
import { Star, Pin, Trash2, Folder } from 'lucide-react';
import { getRelativeTime } from '@/lib/utils';

export function NoteCard({ note, onClick }: { note: Note; onClick: () => void }) {
  const togglePin = useTogglePin();
  const deleteNote = useDeleteNote();

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin.mutate(note.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote.mutate(note.id);
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1">
          <h3 className="font-semibold line-clamp-1">{note.title}</h3>
          {note.folder && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Folder className="h-3 w-3 mr-1" style={{ color: note.folder.color }} />
              {note.folder.name}
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={handlePin}
          >
            <Pin
              className={`h-4 w-4 ${note.isPinned ? 'fill-current text-primary' : ''}`}
            />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {note.content || 'No content'}
        </p>
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          {getRelativeTime(note.updatedAt)}
        </p>
      </CardContent>
    </Card>
  );
}