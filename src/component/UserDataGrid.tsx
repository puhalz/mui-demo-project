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
    GridSlotProps,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import { randomId, randomArrayItem } from '@mui/x-data-grid-generator'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addUser, deleteUser, fetchUsers } from '../services/userApi'
import {
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleRowEditStop,
    handleRowModesModelChange,
    handleSaveClick,
    processRowUpdate,
} from '../services/userActions'
import SideDrawerEdit from './SideDrawerEdit'

const roles = ['Market', 'Finance', 'Development']
const randomRole = () => {
    return randomArrayItem(roles)
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
    const { t } = useTranslation()

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
            }}>
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

export default function UserDataGrid({ isInlineEdit }) {
    const [rows, setRows] = React.useState(initialRows)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    )
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const { t } = useTranslation()

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchUsers() // Fetch the data using the service function
            setRows(data) // Update the rows with the fetched data
        }

        loadData() // Call the loadData function to fetch and set rows
    }, [])

    // Create action handlers by passing in the state setters
    const saveClick = handleSaveClick(setRowModesModel)
    const editClick = handleEditClick(setRowModesModel)
    const deleteClick = handleDeleteClick(setRows)
    const cancelClick = handleCancelClick(setRowModesModel)

    const onRowModesModelChange = handleRowModesModelChange(setRowModesModel)
    const onProcessRowUpdate = processRowUpdate(setRows)

    const handleDrawerSave = (updatedRow: any) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        )
        // Optionally, update your backend:
        addUser(updatedRow)
    }

    const handleRowSelection = (id) => {
        // Set the selected row data and open the drawer
        const rowData = rows.find((row) => row.id === id) // Find the row based on the ID
        setSelectedRow(rowData) // Set the selected row data
        setDrawerOpen(true)
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
            valueParser: (value) => {
                return value.replace(/,/g, '') // Remove commas
            },
        },
        {
            field: 'mobile',
            headerName: t('headers.mobile'),
            width: 180,
            type: 'number',
            editable: true,
            valueParser: (value) => {
                return value.replace(/,/g, '') // Remove commas
            },
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
                            onClick={saveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={cancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    isInlineEdit ? (
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={editClick(id)}
                            color="inherit"
                        />
                    ) : (
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={() => handleRowSelection(id)}
                            color="inherit"
                        />
                    ),
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteClick(id)}
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
            }}>
            <DataGrid
                disableDensitySelector
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                autoPageSize
                onRowModesModelChange={onRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={onProcessRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel,
                    },
                }}
                onRowClick={(params) => params}
            />
            <SideDrawerEdit
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                rowData={selectedRow}
                onSave={handleDrawerSave}
            />
        </Box>
    )
}
