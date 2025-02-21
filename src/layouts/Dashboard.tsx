import * as React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'
import {
    IconButton,
    LinearProgress,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material'
import LanguageSwitcher from '../component/LanguageSwitcher'
import SearchIcon from '@mui/icons-material/Search'
import { useSession } from '../SessionContext'

export default function Layout() {
    const { session, loading } = useSession()
    const location = useLocation()

    function ToolbarActionsCustom() {
        return (
            <Stack direction="row">
                <Tooltip title="Search" enterDelay={1000}>
                    <div>
                        <IconButton
                            type="button"
                            aria-label="search"
                            sx={{
                                display: { xs: 'inline', md: 'none' },
                            }}>
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Tooltip>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    type="button"
                                    aria-label="search"
                                    size="small">
                                    <SearchIcon />
                                </IconButton>
                            ),
                            sx: { pr: 0.5 },
                        },
                    }}
                    sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
                />
                <LanguageSwitcher />
                <ThemeSwitcher />
            </Stack>
        )
    }

    if (loading) {
        return (
            <div style={{ width: '100%' }}>
                <LinearProgress />
            </div>
        )
    }

   if (!session) {
        const redirectTo = `/login?callbackUrl=${encodeURIComponent(location.pathname)}`
        return <Navigate to={redirectTo} replace />
    }

    return (
        <DashboardLayout
            slots={{
                toolbarActions: ToolbarActionsCustom,
            }}>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    )
}
