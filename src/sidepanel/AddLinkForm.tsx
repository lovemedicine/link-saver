import { useState } from 'preact/hooks';
import { getPageInfo } from './util.ts';

type Props = {
  saveLink: (
    url: string,
    title: string,
    note?: string,
    iconUrl?: string
  ) => any;
  deleteAllLinks: () => any;
};

export default function AddLinkForm({ saveLink, deleteAllLinks }: Props) {
  const [note, setNote] = useState('');

  function handleNoteChange({
    currentTarget,
  }: JSX.TargetedEvent<HTMLTextAreaElement, Event>) {
    setNote(currentTarget.value ?? '');
  }

  async function handleSaveClick() {
    const { url, title, iconUrl } = await getPageInfo();
    saveLink(url, title, note, iconUrl);
    setNote('');
  }

  return (
    <div className='pt-3'>
      <textarea
        placeholder='Note'
        onChange={handleNoteChange}
        className='textarea textarea-bordered mb-3 w-full bg-yellow-50 leading-snug'
      >
        {note}
      </textarea>
      <div className='flex'>
        <button onClick={handleSaveClick} className='btn btn-primary flex-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-5 w-5'
          >
            <path d='M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z' />
          </svg>
          Add current tab
        </button>
        <button
          onClick={deleteAllLinks}
          className='btn btn-secondary ml-3 flex-none'
        >
          Delete all
        </button>
      </div>
    </div>
  );
}
