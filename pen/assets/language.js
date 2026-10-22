
document.querySelectorAll('.language-picker').forEach(picker => {
  const trigger = picker.querySelector('.language-trigger');
  const menu = picker.querySelector('.language-menu');
  const links = Array.from(picker.querySelectorAll('[data-language-option]'));
  const setOpen = open => {
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  picker.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  picker.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') setOpen(false);
  });
  trigger.addEventListener('click', () => setOpen(menu.hidden));
  picker.addEventListener('focusout', event => {
    if (!picker.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!picker.contains(event.target)) setOpen(false);
  });
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      trigger.focus();
      setOpen(false);
      event.preventDefault();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      const index = links.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 :
        event.key === 'ArrowDown' ? (index + 1) % links.length : (index < 0 ? links.length - 1 : (index - 1 + links.length) % links.length);
      links[next].focus();
    }
  });
});
