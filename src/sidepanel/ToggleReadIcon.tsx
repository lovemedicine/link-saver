type Props = {
  isRead: boolean;
  onClick: () => any;
};

export default function ToggleReadIcon({ isRead, onClick }: Props) {
  return (
    <div
      className='ml-2 flex-auto cursor-pointer'
      title={'mark as ' + isRead ? 'unread' : 'read'}
      onClick={onClick}
    >
      {isRead && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          scale={0.8}
          fill='currentColor'
          stroke='rgb(64, 64, 64)'
          className='h-5 w-5'
        >
          <path
            fillRule='evenodd'
            d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
            clipRule='evenodd'
          />
        </svg>
      )}
      {!isRead && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='10%'
          className='h-5 w-5'
        >
          <path
            strokeWidth='10%'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      )}
    </div>
  );
}
