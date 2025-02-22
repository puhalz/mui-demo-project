// SideDrawerEdit.tsx
import React, { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

interface SideDrawerEditProps {
    open: boolean
    onClose: () => void
    rowData: {
        id: string
        name: string
        role: string
        localnr?: string
        landline?: number
        mobile?: number
    } | null
    onSave: (updatedRow: {
        id: string
        name: string
        role: string
        localnr?: string
        landline?: number
        mobile?: number
    }) => void
}

export default function SideDrawerEdit({
    open,
    onClose,
    rowData,
    onSave,
}: SideDrawerEditProps) {
    const { t } = useTranslation()
    const [formData, setFormData] = useState(rowData)

    // Update local state when rowData changes
    useEffect(() => {
        setFormData(rowData)
    }, [rowData])

    if (!formData) {
        return null
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        console.log(formData)
        setFormData({ ...formData, [name]: value })
    }

    const handleSave = () => {
        if (formData) {
            onSave(formData!) // The '!' tells TypeScript that formData is not null or undefined
        } else {
            console.error('formData is undefined or null')
        }
        onClose()
    }

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 300, p: 2, marginTop: 8 }}>
                <TextField
                    label={t('headers.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('headers.role')}
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('headers.localnr')}
                    name="localnr"
                    value={formData.localnr || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t('headers.landline')}
                    name="landline"
                    type="number"
                    value={formData.landline || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        inputProps: { min: 0 },
                    }}
                />
                <TextField
                    label={t('headers.mobile')}
                    name="mobile"
                    type="number"
                    value={formData.mobile || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        inputProps: { min: 0 },
                    }}
                />
                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        {t('cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}>
                        {t('save')}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    )
}
