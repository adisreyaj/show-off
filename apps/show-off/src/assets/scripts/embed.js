function showOff(e, o) {
  if (!e) {
    throw new Error('showOff: collectionId is required');
  }
  const t = document.createElement('iframe');
  t.src = r(e, o);
  t.width = o?.width ?? '100%';
  t.height = o?.height ?? '500px';
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
  let u = new URL(`https://show-off.adi.so/embed/${e}`);
  Object.keys(t).forEach((e) => {
    u.searchParams.append(e, t[e]);
  });
  return u.href;
}
