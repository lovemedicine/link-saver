import { Link, LinkMap, LinkList, Note } from './types';

const MAP_KEY = 'linkMap';
const LIST_KEY = 'linkList';

export function addLinkToMap(
  linkMap: LinkMap,
  url: string,
  title: string,
  note: string,
  iconUrl?: string
): LinkMap {
  const urlRecord = linkMap[url] || buildLink(url, title, iconUrl);
  const updatedNotes =
    note.length > 0
      ? [...urlRecord.notes, { text: note, date: now() }]
      : urlRecord.notes;
  return {
    ...linkMap,
    [url]: { ...urlRecord, notes: updatedNotes },
  };
}

export function addLinkToList(linkList: LinkList, url: string): LinkList {
  return [...new Set([url, ...linkList])];
}

export function buildLink(url: string, title: string, iconUrl?: string): Link {
  return {
    url,
    title,
    date: now(),
    read: false,
    iconUrl,
    notes: [],
  };
}

export function now() {
  return new Date().toJSON();
}

export function saveLinkMap(linkMap: LinkMap) {
  localStorage.setItem(MAP_KEY, JSON.stringify(linkMap));
}

export function saveLinkList(linkList: LinkList) {
  localStorage.setItem(LIST_KEY, JSON.stringify(linkList));
}

export function loadLinkMap(): LinkMap {
  return JSON.parse(localStorage.getItem(MAP_KEY) ?? '{}');
}

export function loadLinkList(): LinkList {
  return JSON.parse(localStorage.getItem(LIST_KEY) ?? '[]');
}

export async function getPageInfo(): Promise<{
  url: string;
  title: string;
  iconUrl?: string;
}> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      console.log('tab id', tabs[0].id);
      chrome.tabs.sendMessage(
        tabs[0].id as number,
        { message: 'getPageInfo' },
        resolve
      );
    });
  });
}

function mergeLinks(localLink: Link, remoteLink: Link) {
  return {
    ...localLink,
    read: localLink.read || remoteLink.read,
    notes: mergeNotes(localLink.notes, remoteLink.notes),
  };
}

function mergeNotes(localNotes: Note[], remoteNotes: Note[]) {
  return [
    ...localNotes,
    ...remoteNotes.filter(
      remoteNote => !localNotes.some(note => note.text === remoteNote.text)
    ),
  ].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function mergeLinkMaps(localMap: LinkMap, remoteMap: LinkMap): LinkMap {
  return Object.entries(remoteMap).reduce(
    (mergedMap, [remoteUrl, remoteLink]) => {
      return {
        ...mergedMap,
        [remoteUrl]: mergedMap[remoteUrl]
          ? mergeLinks(mergedMap[remoteUrl], remoteLink)
          : remoteLink,
      };
    },
    { ...localMap }
  );
}

export function generateLinkListFromLinkMap(linkMap: LinkMap): LinkList {
  return Object.values(linkMap)
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .map(link => link.url)
    .reverse();
}
