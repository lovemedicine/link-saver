import { Link } from './types';

type Props = {
  links: Link[];
};

export default function LinkList({ links }: Props) {
  if (links.length === 0) return <div>You haven't saved any links.</div>;

  return (
    <>
      {links.map(link => (
        <div>
          <div>{link.title}</div>
          <div>{link.date}</div>
          <div>{link.url}</div>
          {link.notes.length > 0 && (
            <ul>
              {link.notes.map(note => (
                <li>
                  {note.text} ({note.date})
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}
