import { useState } from 'react';
import { FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

const initialCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/build.css">
  </head>
  <body>
    <main>
      <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              "Merlin CSS is the only framework that I've seen scale on large teams. It's easy to customize, adapts to any design, and the build size is tiny."
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-sky-500 dark:text-sky-400">
              Sarah Dayan
            </div>
            <div class="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>
    </main>
  </body>
</html>`;

export const useEditorLogic = () => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState('html');
  const [activeTabs, setActiveTabs] = useState([
    { id: 'index.html', name: 'index.html', icon: FaHtml5, isActive: true },
    { id: 'merlinbuild.css', name: 'merlinbuild.css', icon: FaCss3Alt, isActive: false },
    { id: 'plugin.js', name: 'plugin.js', icon: FaJs, isActive: false },
  ]);

  const handleChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleTabClick = (id: string) => {
    setActiveTabs(tabs => tabs.map(tab => ({ ...tab, isActive: tab.id === id })));
    if (id.endsWith('.css')) setLanguage('css');
    else if (id.endsWith('.js')) setLanguage('javascript');
    else setLanguage('html');
  };

  const handleTabClose = (id: string) => {
    setActiveTabs(tabs => tabs.filter(tab => tab.id !== id));
  };

  return {
    code,
    language,
    onChange: handleChange,
    activeTabs,
    onTabClick: handleTabClick,
    onTabClose: handleTabClose,
  };
};
