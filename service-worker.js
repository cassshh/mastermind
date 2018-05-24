self.addEventListener('install', e => {
  console.log('Service worker succesfully installed :)', e);
});
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(
      () =>
        new Response('<h1>U offline bro</h1>', {
          headers: new Headers({ 'Content-Type': 'text/html' }),
          status: 200
        })
    )
  );
});
