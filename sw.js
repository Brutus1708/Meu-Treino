// O Service Worker básico para permitir a instalação do PWA
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Instalado');
});

self.addEventListener('fetch', (e) => {
    // Isso permite que o app carregue rápido e satisfaz os requisitos do PWA
    e.respondWith(fetch(e.request).catch(() => console.log('Usuário offline.')));
});