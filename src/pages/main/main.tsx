import React from "react";
import { MapSide } from "../../components/map/mapSide";
import { UserList } from "../../components/userList/userList.jsx";
import styles from "./main.module.scss";

export const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <UserList />
      <MapSide />
    </div>
  );
};
