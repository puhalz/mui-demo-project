import * as React from 'react';
import UserDataGrid from "../component/UserDataGrid";
import EditUser from '../component/SideDrawerEdit'
import { useState } from 'react'
import { Switch } from '@mui/material'

export default function UserPage() {

    const [isInlineEdit, setIsInlineEdit] = useState(false);

    const handleEditModeToggle = () => {
        setIsInlineEdit(!isInlineEdit);
    };
  return (
    <>
        <div>
            <label>Inline Edit:</label>
            <Switch
                checked={isInlineEdit}
                onChange={handleEditModeToggle}
                color="primary"
            />
        </div>
      <UserDataGrid isInlineEdit={isInlineEdit} />
    </>
  );
}
