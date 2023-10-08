export async function getBoard(id: number) {
    return await fetch(`/api/boards/${id}`)
}