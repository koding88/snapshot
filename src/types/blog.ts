import type { FileInfo } from '@/types';

interface EditorBlock {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

interface EditorContent {
  time: number;
  version: string;
  blocks: EditorBlock[];
}

export interface BlogListItem {
  id: string;
  name: string;
  coverImage: FileInfo;
}

export interface BlogDetail extends BlogListItem {
  content: EditorContent;
}
