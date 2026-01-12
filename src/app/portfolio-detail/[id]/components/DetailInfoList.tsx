import { cn } from '@/utils/cn';
import { TagChip } from '@/ui';
import { MOOD_CODE, MoodCode } from '@/types/moodCode';

type DetailInfoListProps = {
  infoList: { label: string; content: ContentType }[];
  layoutClassName?: string;
  rowClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
}

type DetailInfoProps = {
  label: string;
  content: ContentType;
  rowClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
}

type ContentType = string | string[] | MoodCode[];

function getRenderedContent(content: string | string[] | MoodCode[]) {
  if (typeof content === 'string') {
    return content;
  }

  if (isMoodCodeArray(content)) {
    return content.map((mood) => <TagChip key={mood} variant='neon' label={mood} />);
  }

  return content.join(', ');
}

function isMoodCodeArray(content: ContentType): content is MoodCode[] {
  return Array.isArray(content) && content.every((item) => MOOD_CODE.includes(item as MoodCode));
}

export default function DetailInfoList({
  infoList,
  layoutClassName,
  rowClassName,
  labelClassName,
  contentClassName
}: DetailInfoListProps) {
  return (
    <div className={cn('flex flex-col', layoutClassName)}>
      {infoList.map((info) => (
        <DetailInfo
          key={info.label}
          label={info.label}
          content={info.content}
          rowClassName={rowClassName}
          labelClassName={labelClassName}
          contentClassName={contentClassName}
        />
      ))}
    </div>
  );
}

function DetailInfo({
  label,
  content,
  rowClassName,
  labelClassName,
  contentClassName
}: DetailInfoProps) {
  const renderedContent = getRenderedContent(content);

  return (
    <div className={cn('flex', rowClassName)}>
      <div className={cn('self-center text-black-7', labelClassName)}>{label}</div>
      {isMoodCodeArray(content)
        ? <div className={cn('flex items-center gap-[0.4rem]', contentClassName)}>{renderedContent}</div>
        : <span className={cn('text-black-9', contentClassName)}>{renderedContent}</span>
      }
    </div>
  );
}