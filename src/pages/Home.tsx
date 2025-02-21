import * as React from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function HomePage() {
    const { t } = useTranslation()

    return (<>
        <Typography>{t('welcome')}</Typography>
    </>)


}
