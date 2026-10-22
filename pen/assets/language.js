const languageStyle = document.createElement('style');
languageStyle.textContent = "\n.language-picker{position:relative;min-width:142px;max-width:180px}\n.language-trigger{display:flex;align-items:center;width:100%;height:34px;padding:0 36px 0 12px;border:1px solid #cccfcf;border-radius:8px;background:#fff;color:var(--ink);font:inherit;text-align:left;cursor:pointer;position:relative}\n.language-trigger:after{content:\"\";position:absolute;right:14px;top:50%;width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-70%) rotate(45deg);transition:transform .15s}\n.language-trigger[aria-expanded=true]:after{transform:translateY(-20%) rotate(225deg)}\n.language-trigger:hover,.language-trigger[aria-expanded=true]{border-color:#a87d24}\n.language-menu{position:absolute;right:0;top:100%;padding-top:6px;min-width:100%;width:max-content;z-index:30}\n.language-menu[hidden]{display:none}\n.language-options{display:flex;flex-direction:column;max-height: min(360px,60vh);overflow-y:auto;padding:5px;background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 28px #18203318}\n.language-options a{display:block;padding:6px 12px;border-radius:5px;white-space:nowrap;text-decoration:none;font-size:13px}\n.language-options a:hover,.language-options a:focus-visible{background:#f5edda;color:var(--ink)}\n.language-options a[aria-current=true]{background:#f4f1e7;font-weight:700}\n";
document.head.append(languageStyle);

document.querySelectorAll('select[data-language]').forEach(select => {
  const picker = document.createElement('div');
  picker.className = 'language-picker';
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'language-trigger';
  trigger.id = select.id;
  trigger.textContent = select.selectedOptions[0].textContent;
  trigger.setAttribute('aria-expanded', 'false');
  const label = select.parentElement.querySelector('label');
  if (label) {
    label.id = select.id + '-label';
    trigger.setAttribute('aria-labelledby', label.id + ' ' + trigger.id);
  }
  const menu = document.createElement('div');
  menu.className = 'language-menu';
  menu.id = select.id + '-options';
  menu.hidden = true;
  trigger.setAttribute('aria-controls', menu.id);
  const options = document.createElement('div');
  options.className = 'language-options';
  const links = Array.from(select.options, option => {
    const link = document.createElement('a');
    link.href = option.value;
    link.lang = option.lang;
    link.hreflang = option.lang;
    link.textContent = option.textContent;
    if (option.selected) link.setAttribute('aria-current', 'true');
    options.append(link);
    return link;
  });
  menu.append(options);
  picker.append(trigger, menu);
  select.replaceWith(picker);
  const setOpen = open => {
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  picker.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  picker.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !picker.contains(document.activeElement)) setOpen(false);
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
