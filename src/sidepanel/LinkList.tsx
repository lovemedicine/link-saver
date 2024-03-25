import { useState } from 'preact/hooks';
import NotesToggler from './NotesToggler';
import ToggleReadIcon from './ToggleReadIcon';
import DeleteIcon from './DeleteIcon';
import { format } from 'timeago.js';
import { Link } from './types';

type Props = {
  links: Link[];
  title: string;
  deleteLink: (url: string) => any;
  toggleLinkRead: (url: string) => any;
};

export default function LinkList({
  links,
  title,
  deleteLink,
  toggleLinkRead,
}: Props) {
  const [visibleNotesUrl, setVisibleNotesUrl] = useState<string | null>(null);

  function getDomain(url: string): string {
    return new URL(url).hostname;
  }

  function openLink(url: string): void {
    chrome.tabs.create({ url, active: true });
  }

  function handleNotesVisibilityChange(url: string) {
    setVisibleNotesUrl(url === visibleNotesUrl ? null : url);
  }

  return (
    <div className='mb-5'>
      <div className='text-md mb-3 pl-3 font-bold text-slate-100'>{title}</div>
      {links.map(link => (
        <div key={link.url} className='py-1 pl-3 hover:bg-neutral-700'>
          <div className='flex'>
            <div className='flex-none'>
              <img
                src={
                  link.iconUrl ||
                  `https://s2.googleusercontent.com/s2/favicons?sz=48&domain=${encodeURI(link.url)}`
                }
                className='bg-base-100 h-11 w-11 rounded-md p-3'
              />
            </div>

            <div className='group flex-auto px-3 pt-1'>
              <div className='flex'>
                <div
                  className='flex-auto cursor-pointer'
                  onClick={() => openLink(link.url)}
                >
                  <div className='line-clamp-1 font-semibold'>{link.title}</div>
                  <div>
                    {getDomain(link.url)} &bull; {format(link.date)}
                  </div>
                </div>

                <div className='mt-2 hidden flex-none group-hover:flex'>
                  {link.notes.length > 0 && (
                    <div className='flex-auto'>
                      <NotesToggler
                        onToggle={() => handleNotesVisibilityChange(link.url)}
                        isOpen={visibleNotesUrl === link.url}
                      />
                    </div>
                  )}
                  <ToggleReadIcon
                    isRead={link.read}
                    onClick={() => toggleLinkRead(link.url)}
                  />
                  <DeleteIcon onClick={() => deleteLink(link.url)} />
                </div>
              </div>

              {visibleNotesUrl === link.url && link.notes.length > 0 && (
                <ul>
                  {link.notes.map(note => (
                    <li>{note.text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
