// src/utils/obterHorarioLocal.js

/**
 * Retorna o horário local atual no formato "HH:mm"
 * Exemplo: "08:45" ou "17:09"
 * @returns {string}
 */
export function obterHorarioLocal() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  return `${horas}:${minutos}`;
}
