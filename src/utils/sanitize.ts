const illegalRe = /[\/\?<>\\:\*\|":]/g
const controlRe = /[\x00-\x1f\x80-\x9f]/g
const reservedRe = /^\.+$/
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i

export function sanitize(input: string, replacement = '') {
  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
  return sanitized
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(sanitize(';alskdjf/as/f a a/sdf/a.pdf.com'))
}
