export type Link = {
  url: string;
  title: string;
  date: string;
  read: boolean;
  iconUrl?: string;
  notes: Note[];
};

export type Note = {
  text: string;
  date: string;
};

export type LinkMap = {
  [url: string]: Link;
};

export type LinkList = string[];
