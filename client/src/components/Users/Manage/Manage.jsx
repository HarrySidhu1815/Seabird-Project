import React, { useEffect, useState } from "react";
import classes from "./Manage.module.css";
import Table from "./Table";
import Loading from "../../../UI/Loading";
import ErrorBlock from "../../../UI/ErrorBlock";
import { useSelector } from "react-redux";

export default function ManageUser() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const response = await fetch("/api/user/", {
        method: "POST",
        body: JSON.stringify({
          user: currentUser,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setUsers(data.users);
      setIsLoading(false);
    }

    fetchUsers();
  }, [currentUser]);

  function handleErrorClose() {
    setError(null);
  }

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = (
      <>
        {error && <ErrorBlock message={error} handleClose={handleErrorClose} />}
        <p>Error Occurred</p>
      </>
    );
  }

  if (users) {
    content = <Table data={users} headers={["Email", "Date Added", "Last Activity"]} showAll={showAll}/>;
  }

  return (
    <div className={classes.manage}>
      <div className={classes["user-manage-head"]}>
        <h3>Manage Active Users</h3>
        <button onClick={()=> {setShowAll(prevState => !prevState)}}>
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {content}
    </div>
  );
}
