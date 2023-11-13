import { Component } from "react";
import UserItem from "./UserItem";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      inputValue: "",
      users: [
        { id: 1, name: "Name 1" },
        { id: 2, name: "Name 2" },
      ],
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Derived State Log");
    return {
      name: "Aragorn",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((data) => data.json())
      .then((res) => console.log(res));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.state.show == nextState.show && this.state.users == nextState.users
    );
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };

  adduser = (event) => {
    event.preventDefault();
    const user = {
      id: this.state.users.length + 1,
      name: this.state.inputValue,
    };

    this.setState({
      users: [...this.state.users, user],
      inputValue: "",
    });
  };

  removeuser = (id) => {
    const users = this.state.users.filter((user) => user.id !== id);
    this.setState({ users });
  };

  toggle = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  };

  open = () => {
    this.setState({ show: true });
  };

  render() {
    console.log("Render Log", this.state);
    return (
      <div className="users">
        <form onSubmit={this.adduser} className="user-form">
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.inputValue}
          />
          <button type="submit">Add Name</button>
        </form>
        <button className="btn" onClick={this.toggle}>
          Toggle
        </button>
        <button className="btn" onClick={this.open}>
          Open
        </button>

        {this.state.show &&
          this.state.users.map((user) => (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              action={this.removeuser}
            />
          ))}
      </div>
    );
  }
}

export default UsersList;
