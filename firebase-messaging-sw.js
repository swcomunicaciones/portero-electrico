importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDXJRaFIR8K7XvYuwqg-_t-PqF__vxw1Z0",
  authDomain: "portero-electrico-f9e63.firebaseapp.com",
  databaseURL: "https://portero-electrico-f9e63-default-rtdb.firebaseio.com",
  projectId: "portero-electrico-f9e63",
  storageBucket: "portero-electrico-f9e63.firebasestorage.app",
  messagingSenderId: "900720232104",
  appId: "1:900720232104:web:c9e6d10b13b4d2ef4fa49d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  const room = payload.data?.room || '';

  self.registration.showNotification(title || '🔔 ¡Hay visita!', {
    body: body || 'Alguien está en la puerta',
    icon: '/icon.png',
    badge: '/icon.png',
    data: { room },
    actions: [
      { action: 'answer', title: '📹 Atender' },
      { action: 'reject', title: 'Ignorar' }
    ],
    requireInteraction: true,
    vibrate: [400, 200, 400, 200, 400]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'answer' || !event.action) {
    const room = event.notification.data?.room;
    if (room) {
      event.waitUntil(
        clients.openWindow(`https://meet.jit.si/${room}`)
      );
    }
  }
});
