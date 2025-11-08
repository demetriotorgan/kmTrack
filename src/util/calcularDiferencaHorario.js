// src/utils/calcularDiferencaHorario.js

/**
 * Calcula a diferença entre dois horários (formato "HH:mm") em minutos.
 * Considera virada de dia (quando o horário final é menor que o inicial).
 *
 * @param {string} inicio - Horário inicial no formato "HH:mm".
 * @param {string} final - Horário final no formato "HH:mm".
 * @returns {number} Diferença em minutos.
 */
export function calcularDiferencaHorario(inicio, final) {
  if (!inicio || !final) return 0;

  const hoje = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const inicioDate = new Date(`${hoje}T${inicio}:00`);
  const finalDate = new Date(`${hoje}T${final}:00`);

  // Caso o horário final seja menor (passou da meia-noite)
  if (finalDate < inicioDate) {
    finalDate.setDate(finalDate.getDate() + 1);
  }

  const diffMs = finalDate - inicioDate;
  const diffMin = Math.max(0, Math.floor(diffMs / 60000));

  return diffMin;
}
