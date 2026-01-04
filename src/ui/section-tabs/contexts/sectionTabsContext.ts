import * as React from 'react';

type SectionTabsIndicatorStyle = {
  leftRem: number;
  widthRem: number;
};

type SectionTabsContextValue = {
  value: string;
  handleValueChange: (value: string) => void;
  indicatorStyle: SectionTabsIndicatorStyle | null;
  setIndicatorStyle: (style: SectionTabsIndicatorStyle | null) => void;
  baseId: string;
};

const SectionTabsContext = React.createContext<SectionTabsContextValue | null>(null);

const useSectionTabsContext = (componentName: string) => {
  const context = React.useContext(SectionTabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within SectionTabs.`);
  }

  return context;
};

export { SectionTabsContext, useSectionTabsContext };
export type { SectionTabsContextValue, SectionTabsIndicatorStyle };
