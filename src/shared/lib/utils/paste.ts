export async function paste() {
  try {
    const clipText = await navigator.clipboard.readText()
    return {
      clipText,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      clipText: null,
      error: "Your browser doesn't support this API",
    }
  }
}
