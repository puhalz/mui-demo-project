import { http, HttpResponse } from 'msw'

interface User {
    id: number
    name: string
    role: string

}

// Function to get users from localStorage
const getUsersFromLocalStorage = (): User[] => {
    const storedUsers = localStorage.getItem('users')
    return storedUsers ? JSON.parse(storedUsers) : []
}

// Function to save users to localStorage
const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users))
}

export const userHandlers = [
    http.get('/api/users', () => {
        const users = getUsersFromLocalStorage()
        return HttpResponse.json(users)
    }),
    http.post('/api/users', async ({ request }) => {
        const updatedUser: User = (await request.json()) as User

        const users = getUsersFromLocalStorage()

        // Find the user to update or add a new one
        const existingUserIndex = users.findIndex(
            (user) => user.id === updatedUser.id
        )
        if (existingUserIndex >= 0) {
            users[existingUserIndex] = updatedUser // Update existing user
        } else {
            users.push(updatedUser) // Add new user
        }

        // Save the updated users array to localStorage
        saveUsersToLocalStorage(users)

        return HttpResponse.json(updatedUser, { status: 200 })
    }),
    http.delete('/api/users/', async ({ request }) => {
        const deleteUser: User = (await request.json()) as User
        console.log(deleteUser)
        //const userId = parseInt(request.params.id, 10);
        const users = getUsersFromLocalStorage()

        // Remove the user with the specified id
        const updatedUsers = users.filter(
            (user: any) => user.id !== deleteUser.id
        )
        saveUsersToLocalStorage(updatedUsers)
    }),
    http.delete('/api/users/:id', async ({ request }) => {
        // const userId = request.params.id; // Assuming ID is passed as part of the URL
        const url = new URL(request.url)
        const userId = url.pathname.split('/').pop()
        console.log('Deleting user with ID:', userId)
        const users = getUsersFromLocalStorage()

        const updatedUsers = users.filter((user: any) => user.id !== userId)
        saveUsersToLocalStorage(updatedUsers)

        return HttpResponse.json({
            message: 'User deleted successfully',
            users: updatedUsers,
        })
    }),
]
