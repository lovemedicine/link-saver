import { Link, LinkMap } from './types';
import { buildLink, mergeLinkMaps, now } from './util';

const links = Array(10)
  .fill(null)
  .map((_, i) =>
    buildLink(`link${i} url`, `link${i} title`, `link${i} iconUrl`)
  );

function buildMapFromLinks(links: Link[]): LinkMap {
  return links.reduce((map, link) => ({ ...map, [link.url]: link }), {});
}

describe('mergeLinkMaps', () => {
  const localMap = buildMapFromLinks(links.slice(0, 5));

  it('should output local map if remote map is empty', () => {
    expect(mergeLinkMaps(localMap, {})).toEqual(localMap);
  });

  it('should output local map if both maps are equal', () => {
    expect(mergeLinkMaps(localMap, { ...localMap })).toEqual(localMap);
  });

  it('should add missing remote links to local map', () => {
    expect(mergeLinkMaps(localMap, buildMapFromLinks(links.slice(3)))).toEqual(
      buildMapFromLinks(links)
    );
  });

  it('should mark local link as read if remote link is read', () => {
    const [url, localLink] = Object.entries(localMap)[0];
    const remoteLink = { ...localLink, read: true };
    const remoteMap = { ...localMap, [url]: remoteLink };
    expect(localMap[url].read).toBe(false);
    expect(mergeLinkMaps(localMap, remoteMap)[url].read).toBe(true);
  });

  it('should add new remote notes to local notes', () => {
    let [url, localLink] = Object.entries(localMap)[0];
    localMap[url].notes = [
      { text: 'note1 text', date: now() },
      { text: 'note2 text', date: now() },
    ];
    const remoteLink = {
      ...localLink,
      notes: [
        { text: 'note1 text', date: now() },
        { text: 'note2 text', date: now() },
        { text: 'note3 text', date: now() },
      ],
    };
    const remoteMap = { ...localMap, [url]: remoteLink };
    const mergedMap = mergeLinkMaps(localMap, remoteMap);
    expect(mergedMap[url].notes).toEqual(remoteLink.notes);
  });
});
