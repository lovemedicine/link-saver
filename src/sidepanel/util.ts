import { Link, LinkMap, LinkList } from './types';

const MAP_KEY = 'urlMap';
const LIST_KEY = 'urlList';

export function addLinkToMap(
  linkMap: LinkMap,
  url: string,
  title: string,
  note: string
): LinkMap {
  const urlRecord = linkMap[url] || buildLink(url, title);
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
  return [...new Set([...linkList, url])];
}

function buildLink(url: string, title: string): Link {
  return {
    url,
    title,
    date: now(),
    notes: [],
    read: false,
  };
}

function now() {
  return new Date().toJSON();
}

export function saveLinkMap(linkMap: LinkMap) {
  localStorage.setItem(MAP_KEY, JSON.stringify(linkMap));
}

export function saveLinkList(linkList: LinkList) {
  localStorage.setItem(LIST_KEY, JSON.stringify(linkList));
}

export function loadLinkMap() {
  return JSON.parse(localStorage.getItem(MAP_KEY) ?? '{}');
}

export function loadLinkList() {
  return JSON.parse(localStorage.getItem(LIST_KEY) ?? '[]');
}

export function clearData() {
  localStorage.setItem(MAP_KEY, '{}');
  localStorage.setItem(LIST_KEY, '[]');
}

export async function getPageInfo(): Promise<{ url: string; title: string }> {
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
