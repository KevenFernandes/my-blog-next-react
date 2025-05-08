import { findAllPostAdmin } from '@/libs/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import { ErrorMessage } from '../../ErrorMessage';

export default async function PostListAdmin() {
  const posts = await findAllPostAdmin();

  if (posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle='Ei, nada bom :P'
        content='Bora criar algum post?'
      />
    );
  }

  return (
    <div className='py-16 flex flex-col gap-2'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={clsx(
              'p-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
              'border-1 border-slate-300 rounded-md',
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-600 italic'>
                (Não Publicado)
              </span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
