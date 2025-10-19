'use client';

import { useState, useEffect } from 'react';
import { useNote, useUpdateNote } from '@/hooks/useNotes';
import { useSummarize, useGenerateTags, useGenerateTitle } from '@/hooks/useAI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  X,
  Save,
  Sparkles,
  Tag,
  Type,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { AIChat } from '@/components/ai/AIChat';

export function NoteEditor({ noteId, onClose }: { noteId: string; onClose: () => void }) {
  const { data: note, isLoading } = useNote(noteId);
  const updateNote = useUpdateNote();
  const summarize = useSummarize();
  const generateTags = useGenerateTags();
  const generateTitle = useGenerateTitle();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setSummary(note.summary || '');
    }
  }, [note]);

  const handleSave = async () => {
    await updateNote.mutateAsync({
      id: noteId,
      data: { title, content, tags, summary },
    });
    setHasChanges(false);
  };

  const handleSummarize = async () => {
    if (!content.trim()) return;
    try {
      const result = await summarize.mutateAsync(content);
      setSummary(result);
      setHasChanges(true);
    } catch (error) {
      console.error('Summarization failed:', error);
    }
  };

  const handleGenerateTags = async () => {
    if (!content.trim()) return;
    try {
      const result = await generateTags.mutateAsync(content);
      setTags(result);
      setHasChanges(true);
    } catch (error) {
      console.error('Tag generation failed:', error);
    }
  };

  const handleGenerateTitle = async () => {
    if (!content.trim()) return;
    try {
      const result = await generateTitle.mutateAsync(content);
      setTitle(result);
      setHasChanges(true);
    } catch (error) {
      console.error('Title generation failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {hasChanges && 'Unsaved changes'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Chat
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateNote.isPending || !hasChanges}
            >
              {updateNote.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Title</label>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleGenerateTitle}
                disabled={generateTitle.isPending || !content.trim()}
              >
                {generateTitle.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Type className="h-4 w-4 mr-2" />
                )}
                AI Generate
              </Button>
            </div>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasChanges(true);
              }}
              placeholder="Note title"
              className="text-2xl font-bold border-none px-0 focus-visible:ring-0"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setHasChanges(true);
              }}
              placeholder="Start writing..."
              className="min-h-[300px] resize-none"
            />
          </div>

          {/* AI Summary */}
          {summary && (
            <Card className="p-4 bg-primary/5">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">AI Summary</h4>
                  <p className="text-sm text-muted-foreground">{summary}</p>
                </div>
              </div>
            </Card>
          )}

          {/* AI Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSummarize}
              disabled={summarize.isPending || !content.trim()}
            >
              {summarize.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Summarize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateTags}
              disabled={generateTags.isPending || !content.trim()}
            >
              {generateTags.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Tag className="h-4 w-4 mr-2" />
              )}
              Generate Tags
            </Button>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => {
                        setTags(tags.filter((_, i) => i !== index));
                        setHasChanges(true);
                      }}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Sidebar */}
      {showChat && (
        <div className="w-96 border-l">
          <AIChat onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
}