function showOff(e, o) {
  if (!e) {
    throw new Error('showOff: collectionId is required');
  }
  const t = document.createElement('iframe');
  t.src = r(e, o);
  t.width = o?.width ?? '100%';
  t.height = o?.height ?? '500px';
  t.frameBorder = '0';
  t.scrolling = '0';
  t.style.border = 'none';
  document.getElementById('show-off-embed').appendChild(t);
}
function r(e, o) {
  const t = {
    showTitle: o?.showTitle ?? 'true',
    showDescription: o?.showDescription ?? 'true',
    showOwner: o?.showOwner ?? 'true',
    padding: o?.padding ?? '16',
  };
  let r = new URL(`https://show-off.adi.so/embed/${e}`);
  Object.keys(t).forEach((e) => {
    r.searchParams.append(e, t[e]);
  });
  return r.href;
}
