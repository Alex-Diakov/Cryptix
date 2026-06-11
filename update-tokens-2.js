import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const directories = ['./components', './hooks'];
let files = [];
directories.forEach(dir => {
    files = files.concat(walkDir(dir));
});
['App.tsx', 'index.tsx', 'constants.tsx', 'types.ts'].forEach(f => {
    if(fs.existsSync(f)) files.push(f);
});

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Hardcoded Hex Backgrounds
    content = content.replace(/bg-\[\#121212\]/gi, 'bg-background-input');
    content = content.replace(/bg-\[\#0e0e0e\]/gi, 'bg-background-elevated');
    content = content.replace(/bg-\[\#141414\]/gi, 'bg-background-surface');
    content = content.replace(/bg-\[\#080808\]/gi, 'bg-background-subtle');
    content = content.replace(/bg-\[\#111\]/gi, 'bg-background-card');
    content = content.replace(/bg-\[\#0e0e11\]/gi, 'bg-background-card');
    content = content.replace(/bg-\[\#1a1a1a\]/gi, 'bg-background-surface');
    content = content.replace(/bg-\[\#18181B\]/gi, 'bg-background-input');
    
    // Hardcoded Borders
    content = content.replace(/border-\[\#333\]/g, 'border-strong');
    content = content.replace(/border-zinc-800/g, 'border-subtle');
    content = content.replace(/border-zinc-700/g, 'border-strong');
    content = content.replace(/border-white\/\[0\.0[0-9]+\]/g, 'border-subtle');
    content = content.replace(/border-white\/10/g, 'border-strong');
    content = content.replace(/border-white\/5/g, 'border-subtle');

    // Zinc Backgrounds -> Semantic
    content = content.replace(/bg-zinc-800([^/])/g, 'bg-background-surface$1');
    content = content.replace(/bg-zinc-900([^/])/g, 'bg-background-card$1');
    content = content.replace(/bg-black([^/])/g, 'bg-background-subtle$1');
    
    // Remaining Text Zinc
    content = content.replace(/text-zinc-300([^/])/g, 'text-content-secondary$1');
    content = content.replace(/text-zinc-500([^/])/g, 'text-content-tertiary$1');
    content = content.replace(/text-zinc-400([^/])/g, 'text-content-secondary$1');
    
    // Fix any border-subtle overrides that were done with opacity like bg-zinc-900/50 -> handle manually or leave if okay, 
    // actually let's leave opacity background utilities as they might be doing specific glass effects. 
    // Wait, replacing 'bg-zinc-900 ' without slashes works safely.

    fs.writeFileSync(file, content, 'utf-8');
});

console.log('Successfully completed final token audit and replacement!');
