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

  function saveLink(url: string, title: string, note = '') {
    setLinkMap(addLinkToMap(linkMap, url, title, note));
    setLinkList(addLinkToList(linkList, url));
  }

  const links = linkList.map(url => linkMap[url]);

  return (
    <>
      <LinkList links={links} />
      <AddLinkForm saveLink={saveLink} />
    </>
  );
};

export default Sidepanel;
