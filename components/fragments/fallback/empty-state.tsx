import { FileSearch, FolderOpen, Inbox, LucideIcon, SearchX } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type EmptyStateVariant = 'default' | 'search' | 'folder' | 'inbox';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, { icon: LucideIcon; title: string; description: string }> = {
  default: {
    icon: FileSearch,
    title: 'No data found',
    description: 'The data you are looking for was not found or is not available.',
  },
  search: {
    icon: SearchX,
    title: 'No results found',
    description: 'Try changing your search keyword.',
  },
  folder: {
    icon: FolderOpen,
    title: 'Folder is empty',
    description: 'There are no files or documents in this folder yet.',
  },
  inbox: {
    icon: Inbox,
    title: 'Inbox is empty',
    description: 'You have no new messages.',
  },
};

export function EmptyState({ variant = 'default', icon, title, description, actionLabel, onAction, className }: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-muted/50 blur-xl scale-150" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">{displayTitle}</h3>

      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{displayDescription}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
