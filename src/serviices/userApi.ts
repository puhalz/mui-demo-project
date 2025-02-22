export const fetchUsers = async () => {
    try {
        // Fetch user data
        const response = await fetch('/api/users')

        // Check if the request was successful (status 200)
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return await response.json()
    } catch (err: any) {
        // If there was an error, set the error state
    } finally {
        // Stop loading once the fetch process is complete
    }
}

export const addUser = async (newUser) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })

        if (response.ok) {
            const addedUser = await response.json()
            console.log('Added User:', addedUser)
        } else {
            const errorData = await response.json()
            console.error('Error adding user:', errorData.error)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

export const deleteUser = async (id) => {
    return fetch(`/api/users/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => data)
}
