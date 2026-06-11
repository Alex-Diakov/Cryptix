import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    let results = [];
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
// Add root level files
['App.tsx', 'index.tsx', 'constants.tsx', 'types.ts'].forEach(f => {
    if(fs.existsSync(f)) files.push(f);
});

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Background replacements
    content = content.replace(/bg-\[\#050505\]/g, 'bg-background-subtle');
    content = content.replace(/bg-\[\#09090b\]/g, 'bg-background-card');
    content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-background-surface');
    content = content.replace(/bg-\[\#18181b\]/g, 'bg-background-input');
    content = content.replace(/bg-\[\#0f0f0f\]/g, 'bg-background-elevated');
    content = content.replace(/bg-\[\#050507\]/g, 'bg-background');

    // Text replacements
    content = content.replace(/text-zinc-400([^/])/g, 'text-content-secondary$1');
    content = content.replace(/text-zinc-500([^/])/g, 'text-content-tertiary$1');
    content = content.replace(/text-zinc-600([^/])/g, 'text-content-tertiary$1');
    
    // In some places text-zinc-300 might be text-content
    
    // Border replacements 
    content = content.replace(/border-white\/5([^0-9])/g, 'border-subtle$1');
    content = content.replace(/border-white\/10([^0-9])/g, 'border-strong$1');
    content = content.replace(/border-white\/20([^0-9])/g, 'border-active$1');

    fs.writeFileSync(file, content, 'utf-8');
});

console.log('Successfully updated tokens across all files!');
