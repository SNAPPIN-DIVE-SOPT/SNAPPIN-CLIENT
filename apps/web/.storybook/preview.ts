import type { Preview } from '@storybook/nextjs-vite';
import { createElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import '@/styles/global.css';

const queryClient = getQueryClient();

const preview: Preview = {
  decorators: [
    (Story) => createElement(QueryClientProvider, { client: queryClient }, createElement(Story)),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
