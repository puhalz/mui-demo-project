import * as React from 'react';
import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function LoginLayout() {

    return (
            <PageContainer>
                <Outlet />
            </PageContainer>
    );
}