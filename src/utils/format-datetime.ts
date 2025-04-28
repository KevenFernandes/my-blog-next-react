import {
  format,
  formatDistanceToNow as dateFnsFormatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDatetime(rawDate: string): string {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDistanceToNow(rawDate: string): string {
  const data = new Date(rawDate);

  return dateFnsFormatDistanceToNow(data, {
    locale: ptBR,
    addSuffix: true,
  });
}

const dateD = '2025-04-24T21:16:20.609Z';
console.log(formatDatetime(dateD));
console.log(formatDistanceToNow(dateD));
