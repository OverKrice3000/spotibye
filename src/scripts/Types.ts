export type albumButtonType = "Save" | "Remove"

export type Albums = {
    href: string
    items: AlbumType[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

export type AlbumType = {
    album_type: string
    artists: Artist[]
    available_markets: string[]
    external_urls: {spotify: string}
    href: string
    id: string
    images: AlbumImage[]
    name: string
    release_date: string
    release_date_precision: string
    saved: boolean
    total_tracks: number
    type: string
    uri: string
}

export type Artist = {
    external_urls: {spotify: string}
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export type AlbumImage = {
    height: number
    url: string
    width: number
}
