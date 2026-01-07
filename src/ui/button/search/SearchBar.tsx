import SearchFieldBase from './base/SearchField';

type SearchBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder: string;
  icon?: React.ReactNode | null;
};

const SearchBar = ({
  placeholder,
  icon,
  ...props
}: SearchBarProps) => {
  return (
    <SearchFieldBase
      variant='searchBar'
      placeholder={placeholder}
      icon={icon}
      {...props}
    />
  );
};

export default SearchBar;
