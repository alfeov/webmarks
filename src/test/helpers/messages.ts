import en from '@/shared/i18n/messages/en.json'
import ru from '@/shared/i18n/messages/ru.json'

export const messages = [en, ru]

// test helper
export const extractNumber = (s: string) => Number(s.match(/\d+/)?.[0])
