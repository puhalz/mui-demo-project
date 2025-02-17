import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlotProps,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { randomId, randomArrayItem } from '@mui/x-data-grid-generator'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const roles = ['Market', 'Finance', 'Development']
const randomRole = () => {
    return randomArrayItem(roles)
}

interface User {
    id: string
    name: string
    role: string
}

const initialRows: GridRowsProp = []

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel
        ) => void
    }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
    const { setRows, setRowModesModel } = props
    const { t } = useTranslation();

    const handleClick = () => {
        const id = randomId()
        setRows((oldRows) => [
            ...oldRows,
            { id, name: '', role: '', isNew: true },
        ])
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }))
    }

    return (
        <GridToolbarContainer
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <GridToolbarQuickFilter />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
            </div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                {t('create_user')}
            </Button>
        </GridToolbarContainer>
    )
}

export default function UserDataGrid() {
    const [rows, setRows] = React.useState(initialRows)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )
    const { t } = useTranslation()

    useEffect(() => {
        fetchUsers()
    }, [])

    // @ts-ignore
    const fetchUsers = async () => {
        try {
            // Fetch user data
            const response = await fetch('/api/users')

            // Check if the request was successful (status 200)
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }

            // Parse JSON data
            const data = await response.json()
            setRows(data) // Update rows state with the fetched data
        } catch (err: any) {
            // If there was an error, set the error state
        } finally {
            // Stop loading once the fetch process is complete
        }
    }

    const deleteUser = async (newUser) => {
        return fetch(`/api/users/${newUser.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => data)
    }

    // @ts-ignore
    const addUser = async (newUser) => {
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
                fetchUsers()
            } else {
                const errorData = await response.json()
                console.error('Error adding user:', errorData.error)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        })
    }

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        })
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id))
        // @ts-ignore
        const rowToDelete = rows.find((row) => row.id === id)

        if (!rowToDelete) return // If row doesn't exist, return

        // First, optimistically remove the row from state
        const updatedRows = rows.filter((row) => row.id !== id)
        setRows(updatedRows)

        // Call delete API (MSW intercepts the request)
        deleteUser(rowToDelete)
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })

        // @ts-ignore
        const editedRow = rows.find((row) => row.id === id)
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id))
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        addUser(newRow)
        fetchUsers()
        return updatedRow
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('headers.name'),
            width: 180,
            editable: true,
        },
        {
            field: 'role',
            headerName: t('headers.role'),
            width: 220,
            editable: true,
        },
        {
            field: 'localnr',
            headerName: t('headers.localnr'),
            width: 180,
            editable: true,
        },
        {
            field: 'landline',
            headerName: t('headers.landline'),
            width: 180,
            type: 'number',
            editable: true,
        },
        {
            field: 'mobile',
            headerName: t('headers.mobile'),
            width: 180,
            type: 'number',
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                disableDensitySelector
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                autoPageSize
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel,
                    },
                }}
            />
        </Box>
    )
}
