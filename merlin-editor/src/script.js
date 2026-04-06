import {CodeJar} from 'https://cdnjs.cloudflare.com/ajax/libs/CodeJar/3.2.2/codejar.js';

document.addEventListener('DOMContentLoaded', () => {
  const editorElem = document.getElementById('editor');
  const lineNumbers = document.getElementById('line-numbers');

  const highlight = editor => {
    // preserve code
    let code = editor.textContent;
    editor.innerHTML = Prism.highlight(code, Prism.languages.html, 'html');
    updateLineNumbers(code);
  };

  const updateLineNumbers = (code) => {
    const lines = code.split('\n').length;
    let numbersHtml = '';
    for (let i = 1; i <= lines; i++) {
      numbersHtml += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = numbersHtml;
  };

  // Initialize CodeJar
  const jar = CodeJar(editorElem, highlight, {
    tab: '  ',
    spellcheck: false
  });
  
  // Initial lines
  updateLineNumbers(editorElem.textContent);

  // Handle sidebar clicks for animations
  const files = document.querySelectorAll('.pl-14');
  files.forEach(file => {
    file.addEventListener('click', (e) => {
      // Remove active class from all
      files.forEach(f => {
        f.classList.remove('bg-[#352c24]', 'border-l-2', 'border-orange-500', 'bg-[#2d2d2d]', 'font-medium');
        f.classList.add('hover:bg-[#2a2a2a]', 'text-textMuted');
        f.classList.remove('text-orange-400', 'text-yellow-400', 'text-blue-400');
      });
      
      // Add active state to clicked
      file.classList.remove('hover:bg-[#2a2a2a]', 'text-textMuted');
      file.classList.add('bg-[#2d2d2d]', 'font-medium', 'text-white');
    });
  });
});
