export interface ValidationErrors {
  [key: string]: string
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone: string): boolean {
  return /^[\d\s\-().+]{7,20}$/.test(phone)
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} is required`
  return null
}

export function validateContactForm(data: Record<string, string>): ValidationErrors {
  const errors: ValidationErrors = {}
  const requiredFields: [string, string][] = [
    ['name', 'Name'],
    ['email', 'Email'],
    ['subject', 'Subject'],
    ['message', 'Message'],
  ]
  for (const [field, label] of requiredFields) {
    const error = validateRequired(data[field], label)
    if (error) errors[field] = error
  }
  if (data.email && !validateEmail(data.email)) errors.email = 'Invalid email address'
  return errors
}

export function validateLeadForm(data: Record<string, string>): ValidationErrors {
  const errors: ValidationErrors = {}
  const requiredFields: [string, string][] = [
    ['name', 'Full Name'],
    ['email', 'Email'],
    ['phone', 'Phone Number'],
  ]
  for (const [field, label] of requiredFields) {
    const error = validateRequired(data[field], label)
    if (error) errors[field] = error
  }
  if (data.email && !validateEmail(data.email)) errors.email = 'Invalid email address'
  if (data.phone && !validatePhone(data.phone)) errors.phone = 'Invalid phone number'
  return errors
}

export function validateViewingForm(data: Record<string, string>): ValidationErrors {
  const errors: ValidationErrors = {}
  const requiredFields: [string, string][] = [
    ['name', 'Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['project', 'Project'],
    ['preferredDate', 'Preferred Date'],
    ['preferredTime', 'Preferred Time'],
  ]
  for (const [field, label] of requiredFields) {
    const error = validateRequired(data[field], label)
    if (error) errors[field] = error
  }
  if (data.email && !validateEmail(data.email)) errors.email = 'Invalid email address'
  if (data.phone && !validatePhone(data.phone)) errors.phone = 'Invalid phone number'
  return errors
}

export function validateLoginForm(data: Record<string, string>): ValidationErrors {
  const errors: ValidationErrors = {}
  const requiredFields: [string, string][] = [
    ['email', 'Email'],
    ['password', 'Password'],
  ]
  for (const [field, label] of requiredFields) {
    const error = validateRequired(data[field], label)
    if (error) errors[field] = error
  }
  if (data.email && !validateEmail(data.email)) errors.email = 'Invalid email address'
  return errors
}
