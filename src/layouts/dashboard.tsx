import * as React from 'react';
import { Outlet } from 'react-router';
import {DashboardLayout, ThemeSwitcher} from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import {Stack} from "@mui/material";
import LanguageSwitcher from "../component/LanguageSwitcher";

export default function Layout() {

    function ToolbarActionsCustom() {
        return (
            <Stack direction="row">
                <LanguageSwitcher/>
                <ThemeSwitcher />
            </Stack>
        );
    }

  return (
    <DashboardLayout slots={{
        toolbarActions: ToolbarActionsCustom
    }}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}