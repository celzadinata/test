export default function truncateText(
  text: string,
  maxLength = 100,
  useSentences = false
): string {
  if (!text) return "";

  if (useSentences) {
    // Split by sentences (period followed by space)
    const sentences = text.split(/\.\s+/);
    // Take first sentence and add period back
    if (sentences.length > 0) {
      return sentences[0] + (sentences[0].endsWith(".") ? "" : ".");
    }
    return text;
  } else {
    // Truncate by character count
    if (text.length <= maxLength) return text;
    // Find the last space before maxLength to avoid cutting words
    const lastSpace = text.substring(0, maxLength).lastIndexOf(" ");
    return text.substring(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
  }
}
