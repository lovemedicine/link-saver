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
        className='textarea textarea-bordered mb-3 w-full bg-yellow-50'
      >
        {note}
      </textarea>
      <div className='flex'>
        <button onClick={handleSaveClick} className='btn btn-primary flex-1'>
          Add Current Page
        </button>
        <button
          onClick={deleteAllLinks}
          className='btn btn-secondary ml-3 flex-none'
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
