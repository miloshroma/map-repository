import React, { useEffect, useState } from "react";
import { getImage, usersList } from "../../api/api";
import { useCookies } from "react-cookie";
import styles from "./userList.module.scss";
import { Pagination } from "../../shared/pagination/pagination";

export const UserList = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersCount, setUsersCount] = useState(1);
  const [usersListOfPage, setUsersListOfPage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    usersList(cookies.token, currentPage).then((response) => {
      setUsersCount(response.data.data.num_pages);
      const list = response.data.data.people;
      Promise.all([
        imageHandler(list[0].image_ref),
        imageHandler(list[1].image_ref),
        imageHandler(list[2].image_ref),
      ]).then((values) => {
        const value = values.map((item, index) => {
          return {
            image_ref: item,
            id: list[index].id,
            name: list[index].name,
            surname: list[index].surname,
            midname: list[index].midname,
          };
        });
        setUsersListOfPage(value);
        setLoading(false);
      });
    });
  }, [currentPage]);

  const imageHandler = async (url) => {
    const image = await getImage(cookies.token, url);
    const src = URL.createObjectURL(image.data);
    return src;
  };

  return (
    <div className={styles.usersList}>
      <h1>Users List</h1>
      <div className={styles.list}>
        {usersListOfPage.length && !loading ? (
          <div>
            {usersListOfPage.map((item) => {
              return (
                <div className={styles.user} key={item.id}>
                  <div className={styles.image}>
                    <img src={item.image_ref} alt="avatar" />
                  </div>
                  <div className={styles.fio}>
                    {item.name && <p>{item.name}</p>}
                    {item.midname && (
                      <p className={styles.midname}>{item.midname}</p>
                    )}
                    {item.surname && (
                      <p className={styles.surname}>{item.surname}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <Pagination
        className={styles.paginationBar}
        currentPage={currentPage}
        totalCount={usersCount}
        pageSize={3}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
