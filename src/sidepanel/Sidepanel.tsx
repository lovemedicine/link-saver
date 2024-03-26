import { useState, useEffect } from 'preact/hooks';
import LinkList from './LinkList';
import AddLinkForm from './AddLinkForm';
import LoadingIndicator from './LoadingIndicator';
import {
  addLinkToMap,
  addLinkToList,
  saveLinkMap,
  saveLinkList,
  loadLinkMap,
  loadLinkList,
  mergeLinkMaps,
  generateLinkListFromLinkMap,
} from './util';
import { saveRemoteLinkMap, fetchRemoteLinkMap } from './remote';
import { LinkMap, LinkList as LinkListType, Link } from './types';

const UUID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

const Sidepanel = () => {
  const [linkMap, setLinkMap] = useState<LinkMap>(loadLinkMap());
  const [linkList, setLinkList] = useState<LinkListType>(loadLinkList());
  const [isSyncing, setIsSyncing] = useState(false);
  const linkMapJson = JSON.stringify(linkMap);

  useEffect(() => {
    const syncData = async () => {
      setIsSyncing(true);
      const remoteLinkMap = await fetchRemoteLinkMap();
      const mergedLinkMap = mergeLinkMaps(linkMap, remoteLinkMap);
      const mergedLinkList = generateLinkListFromLinkMap(mergedLinkMap);
      saveLinkMap(mergedLinkMap);
      saveLinkList(mergedLinkList);
      setIsSyncing(false);
    };

    syncData();

    const loadDataFromStorage = () => {
      setLinkMap(loadLinkMap());
      setLinkList(loadLinkList());
    };

    window.addEventListener('storage', loadDataFromStorage);

    return () => {
      window.removeEventListener('storage', loadDataFromStorage);
    };
  }, []);

  useEffect(() => {
    saveLinkMap(linkMap);
    saveLinkList(linkList);
    saveRemoteLinkMap(linkMap);
  }, [linkMapJson]);

  function saveLink(url: string, title: string, note = '', iconUrl?: string) {
    setLinkMap(addLinkToMap(linkMap, url, title, note, iconUrl));
    setLinkList(addLinkToList(linkList, url));
  }

  function toggleLinkRead(url: string) {
    setLinkMap({
      ...linkMap,
      [url]: { ...linkMap[url], read: !linkMap[url].read },
    });
  }

  function deleteLink(url: string) {
    const { url: _, ...updatedLinkMap } = linkMap;
    setLinkMap(updatedLinkMap);
    setLinkList(linkList.filter(savedUrl => savedUrl !== url));
  }

  function deleteAllLinks() {
    if (confirm('Are you sure?')) {
      setLinkMap({});
      setLinkList([]);
    }
  }

  const links = linkList.map(url => linkMap[url]);
  const [readLinks, unreadLinks] = links.reduce<[Link[], Link[]]>(
    (acc, link) => {
      acc[link.read ? 0 : 1].push(link);
      return acc;
    },
    [[], []]
  );

  if (isSyncing) return <LoadingIndicator />;

  return (
    <div className='flex h-full flex-col p-2'>
      <div className='bg-neutral base-content flex-1 rounded-t-lg py-3'>
        <LinkList
          title='Unread'
          links={unreadLinks}
          deleteLink={deleteLink}
          toggleLinkRead={toggleLinkRead}
        />
        <LinkList
          title='Read'
          links={readLinks}
          deleteLink={deleteLink}
          toggleLinkRead={toggleLinkRead}
        />
      </div>
      <div className='flex-none'>
        <AddLinkForm saveLink={saveLink} deleteAllLinks={deleteAllLinks} />
      </div>
    </div>
  );
};

export default Sidepanel;
