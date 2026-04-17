import type { FileInfo, Gallery } from '@/types';

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

export interface ProjectListItem {
  id: string;
  name: string;
  coverImage: FileInfo;
}

export interface ProjectDetail extends ProjectListItem {
  gallery: Pick<Gallery, 'id' | 'name'>;
  content: EditorContent;
}
