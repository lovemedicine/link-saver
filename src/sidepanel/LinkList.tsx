import { useState } from 'preact/hooks';
import NotesToggler from './NotesToggler';
import { format } from 'timeago.js';
import { Link } from './types';

type Props = {
  links: Link[];
  deleteLink: (url: string) => any;
};

export default function LinkList({ links, deleteLink }: Props) {
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
    <div className='bg-neutral h-full rounded-t-lg p-3'>
      {links.map(link => (
        <div key={link.url} className='mb-2 rounded-md hover:bg-neutral-700'>
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
                  <div className='ml-2 hidden flex-auto cursor-pointer'>
                    {/* mini check mark */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  {/* mini x mark */}
                  <div
                    className='ml-2 flex-auto cursor-pointer'
                    onClick={() => deleteLink(link.url)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='h-5 w-5'
                    >
                      <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
                    </svg>
                  </div>
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
