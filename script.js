'use strict';

const mobileMenu = document.querySelector('.mobile-nav');

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.removeAttribute('open');
  });
});

document.querySelectorAll('.result-comparison').forEach((comparison) => {
  const slider = comparison.querySelector('.comparison-slider');
  const photos = [...comparison.querySelectorAll('img')];
  const card = comparison.closest('.result-card');

  if (!(slider instanceof HTMLInputElement) || slider.type !== 'range' || !card || photos.length !== 2) {
    return;
  }

  const updateComparison = () => {
    const value = slider.valueAsNumber;
    const position = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 50;

    comparison.style.setProperty('--position', position + '%');
    slider.setAttribute('aria-valuetext', position + '% antes, ' + (100 - position) + '% depois');
  };

  const showAvailablePhotos = () => {
    const bothPhotosLoaded = photos.every((photo) => photo.complete && photo.naturalWidth > 0);
    card.classList.toggle('has-result-photos', bothPhotosLoaded);
  };

  slider.addEventListener('input', updateComparison);
  photos.forEach((photo) => {
    photo.addEventListener('load', showAvailablePhotos);
    photo.addEventListener('error', showAvailablePhotos);
  });
  updateComparison();
  showAvailablePhotos();
});

document.querySelectorAll('[data-booking-dialog]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.bookingDialog);
  if (!dialog || typeof dialog.showModal !== 'function') {
    return;
  }

  const procedure = dialog.querySelector('select');
  const continueLink = dialog.querySelector('[data-booking-continue]');
  const closeButton = dialog.querySelector('[data-booking-close]');
  const destination = new URL(trigger.href);

  const updateMessage = () => {
    const message = destination.searchParams.get('text');
    const url = new URL(destination);
    if (procedure.value) {
      url.searchParams.set('text', message + ' Tenho interesse em ' + procedure.value + '.');
    }
    continueLink.href = url.href;
  };

  trigger.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    procedure.selectedIndex = 0;
    updateMessage();
    dialog.showModal();
  });

  procedure.addEventListener('change', updateMessage);
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});
