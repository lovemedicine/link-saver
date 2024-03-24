import { useState, useEffect } from 'preact/hooks';

import LinkList from './LinkList';
import AddLinkForm from './AddLinkForm';
import {
  addLinkToMap,
  addLinkToList,
  saveLinkMap,
  saveLinkList,
  loadLinkMap,
  loadLinkList,
} from './util';
import { LinkMap, LinkList as LinkListType } from './types';

const Sidepanel = () => {
  const [linkMap, setLinkMap] = useState<LinkMap>(loadLinkMap());
  const [linkList, setLinkList] = useState<LinkListType>(loadLinkList());

  useEffect(() => {
    saveLinkMap(linkMap);
    saveLinkList(linkList);
  }, [linkMap]);

  function saveLink(url: string, title: string, note = '', iconUrl?: string) {
    setLinkMap(addLinkToMap(linkMap, url, title, note, iconUrl));
    setLinkList(addLinkToList(linkList, url));
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

  const links = linkList.map(url => linkMap[url]).reverse();

  return (
    <div className='flex h-full flex-col p-3'>
      <div className='flex-1'>
        <LinkList links={links} deleteLink={deleteLink} />
      </div>
      <div className='flex-none'>
        <AddLinkForm saveLink={saveLink} deleteAllLinks={deleteAllLinks} />
      </div>
    </div>
  );
};

export default Sidepanel;
