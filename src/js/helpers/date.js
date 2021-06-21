import {format} from "date-fns"

// ЗДЕСЬ НАМ НУЖНО ПРЕОБРАЗОВАТЬ ТУ ДАТУ КОТОРАЯ ПРИХОДИТ В ВИДЕ СТРОКИ в ОБЪЕКТ ДЛЯ ФОРМАТА С ПОМОЩЬЮ DATE-fNS
/**
 *
 * @param {String} str
 * @param {String} type - 'yyyy.mm.dd'
 * @returns {String}
 */
export default function formatDate(str, type) {
  const date = new Date(str)
  return format(date, type)
}
