interface Mark {
  title: string
  description: string
  author: string
  publisher: string
  image: {
    url: string
  }
  url: string
  logo: {
    url: string
  }
}

interface CreateMark {
  title: string
  url: string
  description: string
  logoUrl: string
}
