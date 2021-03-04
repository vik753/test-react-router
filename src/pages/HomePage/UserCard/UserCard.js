import styles from "./userCard.module.scss";
import { useHistory } from "react-router";
import { UserLogo } from "../../UserLogo/UserLogo";

export const UserCard = ({ user }) => {
  const history = useHistory();
  const address = [
    user.address.zipcode,
    user.address.suite.concat(", "),
    user.address.street.concat(", "),
    user.address.city,
  ].join(" ");

  const company = [
    user.company.name.concat(", "),
    user.company.bs.concat(", "),
    user.company.catchPhrase,
  ];

  const cardClickHandler = (id, name) => {
    history.push(`/user/${id}&${name}`);
  };

  return (
    <div
      className={styles.card}
      onClick={() => cardClickHandler(user.id, user.name)}
      title="Click to see posts"
    >
      <div className={styles.card_title}>
        <p>Address: {address}</p>
        <p>Company: {company}</p>
      </div>
      <h4>
        <UserLogo userName={user.name} />
        {user.name}
      </h4>
      <div className={styles.card_info}>
        <p>
          <span>phone:</span> <span>{user.phone}</span>
        </p>
        <p>
          <span>e-mail:</span> <span>{user.email}</span>
        </p>
        <p>
          <span>www:</span> <span>{user.website}</span>
        </p>
      </div>
    </div>
  );
};

/*
address:
  city: "Gwenborough"
  geo: {lat: "-37.3159", lng: "81.1496"}
  street: "Kulas Light"
  suite: "Apt. 556"
  zipcode: "92998-3874"
  __proto__: Object
company:
  bs: "harness real-time e-markets"
  catchPhrase: "Multi-layered client-server neural-net"
  name: "Romaguera-Crona"
  __proto__: Object
email: "Sincere@april.biz"
id: 1
name: "Leanne Graham"
phone: "1-770-736-8031 x56442"
username: "Bret"
website: "hildegard.org"
*/
