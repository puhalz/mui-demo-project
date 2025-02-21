import * as React from 'react'
import {
    GridRowId,
    GridRowModesModel,
    GridRowModel,
    GridRowModes,
    GridRowsProp,
    GridEventListener,
    GridRowEditStopReasons,
} from '@mui/x-data-grid'
import { addUser, deleteUser, fetchUsers } from './userApi'

export const handleDeleteClick =
    (setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>) =>
    (id: GridRowId) =>
    () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))
        // Optionally, remove the user from your backend
        deleteUser(id)
    }

export const handleEditClick =
    (setRowModesModel: React.Dispatch<any>) => (id: GridRowId) => () => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: GridRowModes.Edit },
        }))
    }

export const handleSaveClick =
    (setRowModesModel: React.Dispatch<any>) => (id: GridRowId) => () => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: GridRowModes.View },
        }))
    }

export const handleCancelClick =
    (setRowModesModel: React.Dispatch<any>) => (id: GridRowId) => () => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }))
    }

// Row modes model change handler
export const handleRowModesModelChange =
    (
        setRowModesModel: React.Dispatch<
            React.SetStateAction<GridRowModesModel>
        >
    ) =>
    (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

// Process row update handler
export const processRowUpdate =
    (setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>) =>
    (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        )
        addUser(newRow)
        fetchUsers()
        return updatedRow
    }

export const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true
    }
}
