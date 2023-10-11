export async function getBoard(id: number) {
    return await fetch(`/api/boards/${id}`)
}

export async function getBucket(ident: string) {
    return await fetch(`/api/buckets/${ident}`)
}

export async function getCard(ident: string) {
    return await fetch(`/api/cards/${ident}`)
}