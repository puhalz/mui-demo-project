import * as React from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
    const { t } = useTranslation()

    return <Typography>{t('welcome')}</Typography>
}
