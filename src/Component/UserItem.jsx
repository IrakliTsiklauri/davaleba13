import React, { PureComponent } from "react";

class UserItem extends PureComponent {
  render() {
    const { id, name, action } = this.props;
    return (
      <div className="user-item">
        <p>ID: {id}</p>
        <p>NAME: {name}</p>

        <button onClick={() => action(id)}>Remove</button>
      </div>
    );
  }
}

export default UserItem;
