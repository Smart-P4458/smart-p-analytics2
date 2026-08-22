export function createContactLink(
  subject: string,
  message: string
): string {
  const params = new URLSearchParams({
    contact: "1",
    subject,
    message,
  });

  return `/?${params.toString()}#contact`;
}
