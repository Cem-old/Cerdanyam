import { defineConfig, loadEnv } from 'vite';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig(({ mode, command }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  if (command === 'build') {
    if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) throw new Error('Falta la configuración pública de Supabase');
    const key = env.VITE_SUPABASE_ANON_KEY;
    let role;
    try { role = JSON.parse(Buffer.from(key.split('.')[1], 'base64url')).role; } catch {}
    if (role !== 'anon' && !key.startsWith('sb_publishable_')) throw new Error('Utiliza únicamente una clave pública anon o publishable');
  }
  return {
    base: '/Cerdanyam/',
    plugins: [{
      name: 'github-pages-routes',
      closeBundle() {
        // Real entry points work on Pages without Netlify rewrites.
        for (const route of ['data', 'ranking', 'vote', 'votes']) {
          mkdirSync(resolve('dist', route), { recursive: true });
          copyFileSync(resolve('dist/index.html'), resolve('dist', route, 'index.html'));
        }
        copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'));
      }
    }]
  };
});
