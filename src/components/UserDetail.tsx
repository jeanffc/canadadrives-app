import Link from 'next/link';

export default function UserDetail() {
  return (
    <div>
      User Detail
      <Link href='/'>
        <a>Go back</a>
      </Link>
    </div>
  )
}
