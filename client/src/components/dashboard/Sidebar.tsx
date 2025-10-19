'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFolders, useCreateFolder } from '@/hooks/useFolders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  FileText,
  Folder,
  Plus,
  Star,
  Search,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { data: folders } = useFolders();
  const createFolder = useCreateFolder();
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      await createFolder.mutateAsync({ name: newFolderName });
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">NoteGenius</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavLink
          href="/dashboard"
          icon={<FileText className="h-5 w-5" />}
          label="All Notes"
          active={pathname === '/dashboard'}
        />
        <NavLink
          href="/dashboard?pinned=true"
          icon={<Star className="h-5 w-5" />}
          label="Pinned"
          active={pathname === '/dashboard' && typeof window !== 'undefined' && window.location.search.includes('pinned=true')}
        />

        {/* Folders */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-sm font-medium text-muted-foreground">
              Folders
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => setShowNewFolder(!showNewFolder)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {showNewFolder && (
            <div className="mb-2 px-2">
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateFolder();
                  if (e.key === 'Escape') setShowNewFolder(false);
                }}
                autoFocus
                className="h-8 text-sm"
              />
            </div>
          )}

          {folders?.map((folder) => (
            <NavLink
              key={folder.id}
              href={`/dashboard?folderId=${folder.id}`}
              icon={<Folder className="h-5 w-5" style={{ color: folder.color }} />}
              label={folder.name}
              count={folder._count?.notes}
              active={typeof window !== 'undefined' && window.location.search.includes(`folderId=${folder.id}`)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
  count,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}