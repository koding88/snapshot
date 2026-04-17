export type EditorJsBlock = {
  id?: string;
  type: string;
  data: Record<string, unknown>;
};

export type EditorJsOutputData = {
  time?: number;
  version?: string;
  blocks: EditorJsBlock[];
};

export type MediaLayoutImageItemInput = {
  id: string;
  kind: 'image';
  url?: string;
  uploadToken?: string;
  fileId?: string;
};

export type MediaLayoutYoutubeItem = {
  id: string;
  kind: 'youtube';
  url: string;
};

export type MediaLayoutItemInput = MediaLayoutImageItemInput | MediaLayoutYoutubeItem;

export type MediaLayoutImageItemPersisted = {
  id: string;
  kind: 'image';
  url: string;
  fileId: string;
};

export type MediaLayoutItemPersisted = MediaLayoutImageItemPersisted | MediaLayoutYoutubeItem;
