import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const AdminRoute = ({ element, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser || currentUser.admin !== true) {

    return <Navigate to="/login" />;
  }

  return element;
};

export default AdminRoute;

