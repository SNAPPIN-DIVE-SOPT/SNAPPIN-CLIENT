import * as React from 'react';

type SectionTabsContextValue = {
  value: string | null;
  onValueChange: (value: string) => void;
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
export type { SectionTabsContextValue };
