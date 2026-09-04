export async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return {
      isSuccess: true,
      message: 'Data has been successfully copy to clipboard',
    }
  } catch (error) {
    console.error(error)
    return {
      isSuccess: false,
      message: "Your browser doesn't support this API",
    }
  }
}
