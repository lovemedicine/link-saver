type Props = {
  onClick: () => any;
};

export default function DeleteIcon({ onClick }: Props) {
  return (
    <div
      className='ml-2 flex-auto cursor-pointer'
      title='delete'
      onClick={onClick}
    >
      {/* mini x mark */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='h-5 w-5'
      >
        <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
      </svg>
    </div>
  );
}
