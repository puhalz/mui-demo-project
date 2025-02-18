import * as React from 'react';
import UserDataGrid from "../component/UserDataGrid";
import EditUser from '../component/EditUser'

export default function UserPage() {

  return (
    <>
      <UserDataGrid/>
        <EditUser/>
    </>
  );
}
