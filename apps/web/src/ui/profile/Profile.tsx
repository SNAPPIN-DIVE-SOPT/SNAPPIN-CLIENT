import * as React from 'react';
import Image from 'next/image';
import {
  PROFILE_BASE,
  PROFILE_DESCRIPTION_TYPOGRAPHY_MAP,
  PROFILE_META_TYPOGRAPHY_MAP,
  PROFILE_SIZE_THEME,
  PROFILE_TEXT_COLOR_MAP,
  PROFILE_TITLE_TYPOGRAPHY_MAP,
} from './constants/theme';
import { ProfileContentLines, ProfileSize } from './types/variant';
import { cn } from '@snappin/design-system/lib';
import { IconKeyboardArrowRight } from '@snappin/design-system/assets';

type ProfileProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  size?: ProfileSize;
};

type ProfileItemAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: ProfileSize;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
};

type ProfileContentProps = React.HTMLAttributes<HTMLDivElement> & {
  lines?: ProfileContentLines;
};
type ProfileItemProps = React.HTMLAttributes<HTMLDivElement>;
type ProfileRowProps = React.HTMLAttributes<HTMLDivElement>;
type ProfileTitleProps = React.HTMLAttributes<HTMLParagraphElement> & {
  typography?: keyof typeof PROFILE_TITLE_TYPOGRAPHY_MAP;
  color?: 'black-10';
};
type ProfileDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  typography?: keyof typeof PROFILE_DESCRIPTION_TYPOGRAPHY_MAP;
  color?: 'black-7' | 'black-8';
};
type ProfileMetaProps = React.HTMLAttributes<HTMLParagraphElement> & {
  typography?: keyof typeof PROFILE_META_TYPOGRAPHY_MAP;
  color?: 'black-7' | 'black-8';
};
type ProfileTrailingProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

function hasChildOfType(children: React.ReactNode, type: React.ElementType) {
  return React.Children.toArray(children).some((child) => {
    return React.isValidElement(child) && child.type === type;
  });
}

function ProfileAvatar({
  className,
  size = 'sm',
  src,
  alt = '프로필 이미지',
  fallback,
  children,
  ...props
}: ProfileItemAvatarProps) {
  return (
    <div
      className={cn('bg-black-3 relative shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          width={PROFILE_SIZE_THEME[size].avatar}
          height={PROFILE_SIZE_THEME[size].avatar}
          alt={alt}
          className='object-cover'
        />
      ) : children ? (
        children
      ) : fallback ? (
        fallback
      ) : (
        <Image
          width={PROFILE_SIZE_THEME[size].avatar}
          height={PROFILE_SIZE_THEME[size].avatar}
          src='/imgs/default-profile.png'
          alt={alt}
          className='h-full w-full object-cover'
        />
      )}
    </div>
  );
}

function ProfileContent({ className, lines = 1, ...props }: ProfileContentProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col justify-center',
        lines === 2 ? 'gap-[0.9rem]' : 'gap-0',
        className,
      )}
      {...props}
    />
  );
}

function ProfileItem({ className, ...props }: ProfileItemProps) {
  return (
    <div
      className={cn('flex min-w-0 flex-col justify-center gap-[0.4rem]', className)}
      {...props}
    />
  );
}

function ProfileRow({ className, ...props }: ProfileRowProps) {
  return <div className={cn('flex min-w-0 items-start gap-[0.8rem]', className)} {...props} />;
}

function ProfileTitle({
  typography = 'caption-14-bd',
  color = 'black-10',
  className,
  ...props
}: ProfileTitleProps) {
  return (
    <p
      className={cn(
        'min-w-0 truncate',
        PROFILE_TITLE_TYPOGRAPHY_MAP[typography],
        PROFILE_TEXT_COLOR_MAP[color],
        className,
      )}
      {...props}
    />
  );
}

function ProfileDescription({
  typography = 'caption-12-rg',
  color = 'black-7',
  className,
  ...props
}: ProfileDescriptionProps) {
  return (
    <p
      className={cn(
        'min-w-0 truncate',
        PROFILE_DESCRIPTION_TYPOGRAPHY_MAP[typography],
        PROFILE_TEXT_COLOR_MAP[color],
        className,
      )}
      {...props}
    />
  );
}

function ProfileMeta({
  typography = 'caption-11-md',
  color = 'black-7',
  className,
  ...props
}: ProfileMetaProps) {
  return (
    <p
      className={cn(
        'min-w-0',
        PROFILE_META_TYPOGRAPHY_MAP[typography],
        PROFILE_TEXT_COLOR_MAP[color],
        className,
      )}
      {...props}
    />
  );
}

function ProfileTrailing({ className, children, ...props }: ProfileTrailingProps) {
  return (
    <div
      className={cn('text-black-6 flex shrink-0 items-center justify-center', className)}
      {...props}
    >
      {children ?? <IconKeyboardArrowRight className='h-[2rem] w-[2rem]' aria-hidden='true' />}
    </div>
  );
}

type ProfileItemComponent = ((props: ProfileProps) => React.JSX.Element) & {
  Avatar: typeof ProfileAvatar;
  Content: typeof ProfileContent;
  Item: typeof ProfileItem;
  Row: typeof ProfileRow;
  Title: typeof ProfileTitle;
  Description: typeof ProfileDescription;
  Meta: typeof ProfileMeta;
  Trailing: typeof ProfileTrailing;
};

function ProfileRoot({ size = 'md', className, children, ...props }: ProfileProps) {
  const hasTrailing = hasChildOfType(children, ProfileTrailing);

  return (
    <div className={cn('p-[2rem]', PROFILE_BASE, className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<{ className?: string }>;

        if (element.type === ProfileAvatar) {
          return React.cloneElement(element, {
            className: cn(
              hasTrailing ? 'mr-[1.95rem]' : 'mr-[1.2rem]',
              element.props.className,
              PROFILE_SIZE_THEME[size].avatar,
            ),
          });
        }

        if (element.type === ProfileContent) {
          return React.cloneElement(element, {
            className: cn('min-w-0', element.props.className),
          });
        }

        if (element.type === ProfileTrailing) {
          return React.cloneElement(element, {
            className: cn('ml-auto pl-[1.95rem]', element.props.className),
          });
        }

        return element;
      })}
    </div>
  );
}

const Profile = Object.assign(ProfileRoot, {
  Avatar: ProfileAvatar,
  Content: ProfileContent,
  Item: ProfileItem,
  Row: ProfileRow,
  Title: ProfileTitle,
  Description: ProfileDescription,
  Meta: ProfileMeta,
  Trailing: ProfileTrailing,
}) as ProfileItemComponent;

export default Profile;
export type { ProfileProps, ProfileSize };
