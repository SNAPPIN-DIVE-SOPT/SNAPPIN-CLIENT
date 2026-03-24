import * as React from 'react';
import { IconKeyboardArrowRight, IconProfile } from '../../assets';
import { cn } from '../../lib';
import { PROFILE_ITEM_BASE, PROFILE_ITEM_SIZE_THEME } from './constants/theme';
import { ProfileItemContentLines, ProfileItemSize } from './types/variant';

type ProfileItemProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  size?: ProfileItemSize;
};

type ProfileItemAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
};

type ProfileItemContentProps = React.HTMLAttributes<HTMLDivElement> & {
  lines?: ProfileItemContentLines;
};
type ProfileItemItemProps = React.HTMLAttributes<HTMLDivElement>;
type ProfileItemRowProps = React.HTMLAttributes<HTMLDivElement>;
type ProfileItemTextProps = React.HTMLAttributes<HTMLParagraphElement>;
type ProfileItemTrailingProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

function hasChildOfType(children: React.ReactNode, type: React.ElementType) {
  return React.Children.toArray(children).some((child) => {
    return React.isValidElement(child) && child.type === type;
  });
}

function ProfileItemAvatar({
  className,
  src,
  alt = '프로필 이미지',
  fallback,
  children,
  ...props
}: ProfileItemAvatarProps) {
  return (
    <div
      className={cn(
        'bg-black-3 relative shrink-0 overflow-hidden rounded-full',
        PROFILE_ITEM_SIZE_THEME.md.avatar,
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className='h-full w-full object-cover' />
      ) : children ? (
        children
      ) : fallback ? (
        fallback
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <IconProfile className='text-black-6 h-[60%] w-[60%]' aria-hidden='true' />
        </div>
      )}
    </div>
  );
}

function ProfileItemContent({ className, lines = 1, ...props }: ProfileItemContentProps) {
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

function ProfileItemItem({ className, ...props }: ProfileItemItemProps) {
  return (
    <div
      className={cn('flex min-w-0 flex-col justify-center gap-[0.4rem]', className)}
      {...props}
    />
  );
}

function ProfileItemRow({ className, ...props }: ProfileItemRowProps) {
  return <div className={cn('flex min-w-0 items-start gap-[0.8rem]', className)} {...props} />;
}

function ProfileItemTitle({ className, ...props }: ProfileItemTextProps) {
  return <p className={cn('caption-14-bd text-black-10 min-w-0 truncate', className)} {...props} />;
}

function ProfileItemValue({ className, ...props }: ProfileItemTextProps) {
  return <p className={cn('caption-14-md text-black-7 min-w-0 truncate', className)} {...props} />;
}

function ProfileItemDescription({ className, ...props }: ProfileItemTextProps) {
  return <p className={cn('caption-12-md text-black-7 min-w-0 truncate', className)} {...props} />;
}

function ProfileItemMeta({ className, ...props }: ProfileItemTextProps) {
  return <p className={cn('caption-10-md text-black-7 min-w-0', className)} {...props} />;
}

function ProfileItemTrailing({ className, children, ...props }: ProfileItemTrailingProps) {
  return (
    <div
      className={cn('text-black-6 flex shrink-0 items-center justify-center', className)}
      {...props}
    >
      {children ?? <IconKeyboardArrowRight className='h-[2rem] w-[2rem]' aria-hidden='true' />}
    </div>
  );
}

type ProfileItemComponent = ((props: ProfileItemProps) => React.JSX.Element) & {
  Avatar: typeof ProfileItemAvatar;
  Content: typeof ProfileItemContent;
  Item: typeof ProfileItemItem;
  Row: typeof ProfileItemRow;
  Title: typeof ProfileItemTitle;
  Value: typeof ProfileItemValue;
  Description: typeof ProfileItemDescription;
  Meta: typeof ProfileItemMeta;
  Trailing: typeof ProfileItemTrailing;
};

function ProfileItemRoot({ size = 'md', className, children, ...props }: ProfileItemProps) {
  const hasTrailing = hasChildOfType(children, ProfileItemTrailing);

  return (
    <div
      className={cn(PROFILE_ITEM_BASE, PROFILE_ITEM_SIZE_THEME[size].root, className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<{ className?: string }>;

        if (element.type === ProfileItemAvatar) {
          return React.cloneElement(element, {
            className: cn(
              hasTrailing ? 'mr-[1.95rem]' : 'mr-[1.2rem]',
              element.props.className,
              PROFILE_ITEM_SIZE_THEME[size].avatar,
            ),
          });
        }

        if (element.type === ProfileItemContent) {
          return React.cloneElement(element, {
            className: cn('min-w-0', element.props.className),
          });
        }

        if (element.type === ProfileItemTrailing) {
          return React.cloneElement(element, {
            className: cn('ml-auto pl-[1.95rem]', element.props.className),
          });
        }

        return element;
      })}
    </div>
  );
}

const ProfileItem = Object.assign(ProfileItemRoot, {
  Avatar: ProfileItemAvatar,
  Content: ProfileItemContent,
  Item: ProfileItemItem,
  Row: ProfileItemRow,
  Title: ProfileItemTitle,
  Value: ProfileItemValue,
  Description: ProfileItemDescription,
  Meta: ProfileItemMeta,
  Trailing: ProfileItemTrailing,
}) as ProfileItemComponent;

export default ProfileItem;
export type { ProfileItemProps, ProfileItemSize };
