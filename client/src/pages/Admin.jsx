import React from "react";
import classes from "./pages.module.css";
import AddUser from "../components/Users/AddUser/AddUser";
import ManageUser from "../components/Users/Manage/Manage";
import ManageInterviews from "../components/ManageInterviews/ManageInterviews";
import ManageCurriculum from "../components/ManageCurriculum/ManageCurriculum";
import AdminBar from "../UI/AdminBar";
import { useSelector } from "react-redux";

export default function Admin() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <>
    <div className={classes['admin-unaccessed']}>
      <h1>Need Bigger Screen</h1>
      <p>Please use computer or laptop to access the database</p>
    </div>
    <div className={classes['admin-access']}>
    <div className={classes["admin-Hero"]}>
        <AdminBar />
        <div className={classes.admin}>
          <h1>Admin Panel</h1>
        </div>
      </div>

      <div className={classes["manage-user"]}>
        <h1>User Management</h1>
        <AddUser />
        <ManageUser />
      </div>
    {currentUser.admin === 'full-access' && (
      <>
      <div className={classes["manage-user"]}>
        <h1>Elder Interviews</h1>
        <ManageInterviews />
      </div>

      <div className={classes["manage-user"]}>
        <h1>Curriculum Materials</h1>
       <ManageCurriculum />
      </div>
      </>
    )}
      
    </div>
    </>
  );
}
