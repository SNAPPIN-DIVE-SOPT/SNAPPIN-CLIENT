import SearchFieldBase from './base/SearchField';

type HeaderSearchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  headline: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
};

const HeaderSearch = ({
  headline,
  supportingText,
  icon,
  ...props
}: HeaderSearchProps) => {
  return (
    <SearchFieldBase
      variant='headerSearch'
      headline={headline}
      supportingText={supportingText}
      icon={icon}
      {...props}
    />
  );
};

export default HeaderSearch;
