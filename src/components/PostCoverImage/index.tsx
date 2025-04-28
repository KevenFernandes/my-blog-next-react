import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

type PostCoverImageProps = {
  linkProps: React.ComponentProps<typeof Link>;
  imageProps: React.ComponentProps<typeof Image>;
};

export function PostCoverImage({ linkProps, imageProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-xl',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'w-full',
          'h-full',
          'group-hover:scale-105',
          'transition',
          'object-cover',
          'object-center',
          imageProps.className,
        )}
        alt={imageProps.alt}
      />
    </Link>
  );
}
