import { useState } from 'preact/hooks';
import { getPageInfo } from './util.ts';

type Props = {
  saveLink: (url: string, title: string, note?: string) => any;
};

export default function AddLinkForm({ saveLink }: Props) {
  const [note, setNote] = useState('');

  function handleNoteChange({
    currentTarget,
  }: JSX.TargetedEvent<HTMLTextAreaElement, Event>) {
    setNote(currentTarget.value ?? '');
  }

  async function handleSaveClick() {
    const { url, title } = await getPageInfo();
    saveLink(url, title, note);
    setNote('');
    console.log('saved url', url);
    console.log('saved note', note);
  }

  return (
    <div>
      <textarea onChange={handleNoteChange} className='border'>
        {note}
      </textarea>
      <br />
      <button onClick={handleSaveClick}>Save Current URL</button>
      <button id='clear'>Clear All URLs</button>
    </div>
  );
}
