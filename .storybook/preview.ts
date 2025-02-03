import type { Preview  } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    // layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
const addMaterialIcons = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
addMaterialIcons();

export default preview;
