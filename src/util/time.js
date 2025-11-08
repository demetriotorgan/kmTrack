// src/util/time.js

// converte ISO (UTC) -> "HH:mm" (horário local)
export function isoToHHMM(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

// converte "HH:mm" 
export function hhmmToIso(hhmm, isoBase = null) {
  if (!hhmm) return null;
  const [hStr, mStr] = hhmm.split(':');
  const hours = Number(hStr);
  const minutes = Number(mStr);

  const base = isoBase ? new Date(isoBase) : new Date();
  base.setHours(hours);
  base.setMinutes(minutes);
  base.setSeconds(0);
  base.setMilliseconds(0);

  return base.toISOString();
}
