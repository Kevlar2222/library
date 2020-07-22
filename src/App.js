import React from "react";
import "./App.css";
import Image from "./index.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false,
      books: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkein",
          pages: "295",
          read: "Yes",
        },
      ],
    };
    this.displayForm = this.displayForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }
  removeBook(event) {
    let currentList = this.state.books;
    currentList.splice(event.target.id, 1);
    this.setState({ books: currentList });
  }
  getBook() {
    let current = this.state.books;
    current.push(this.refs.formData.addBook());
    this.setState({ books: current });
    this.refs.formData.addBook();
  }
  displayForm() {
    this.setState({ formDisplayed: true });
  }
  removeForm(event) {
    if (event.target.id === "submitButton") {
      this.getBook();
    }
    this.setState({ formDisplayed: false });
  }
  render() {
    return (
      <React.Fragment>
        <Title />
        <Container bookList={this.state.books} onClick={this.removeBook} />
        <Button onClick={this.displayForm} />
        {this.state.formDisplayed ? (
          <Form ref="formData" onClick={this.removeForm} />
        ) : null}
      </React.Fragment>
    );
  }
}

function Title() {
  return (
    <div id="title">
      <h1>Library</h1>
      <div id="subtitle">
        <h2>By Kevin Satti</h2>
      </div>
    </div>
  );
}

function Container(props) {
  return (
    <div id="container">
      <table id="table">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>#Pages</th>
          <th>Read?</th>
          <th>Remove</th>
        </tr>
        {props.bookList.map((book, index) => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.pages}</td>
            <td>{book.read}</td>
            <td>
              <img
                src={Image}
                alt="Remove Book"
                id={index}
                onClick={props.onClick}
              ></img>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

function Button(props) {
  return (
    <div id="buttonContainer">
      <button id="newBookButton" onClick={props.onClick}>
        New Book
      </button>
    </div>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      pages: "",
      read: false,
    };
    this.titleChange = this.titleChange.bind(this);
    this.authorChange = this.authorChange.bind(this);
    this.pagesChange = this.pagesChange.bind(this);
    this.readChange = this.readChange.bind(this);
    this.addBook = this.addBook.bind(this);
  }
  titleChange(event) {
    this.setState({ title: event.target.value });
    if (event.target.value === "") {
      event.target.className = "invalid";
    } else {
      event.target.className = "formInput";
    }
  }
  authorChange(event) {
    this.setState({ author: event.target.value });
    if (event.target.value === "") {
      event.target.className = "invalid";
    } else {
      event.target.className = "formInput";
    }
  }
  pagesChange(event) {
    this.setState({ pages: String(event.target.value) });
    if (event.target.value === "" || isNaN(event.target.value)) {
      event.target.className = "invalid";
    } else {
      event.target.className = "formInput";
    }
  }
  readChange(event) {
    this.setState({ read: event.target.checked });
  }
  addBook() {
    let readBefore;
    if (this.state.read === false) {
      readBefore = "No";
    } else {
      readBefore = "Yes";
    }
    let book = {
      title: this.state.title,
      author: this.state.author,
      pages: this.state.pages,
      read: readBefore,
    };
    return book;
  }
  render() {
    return (
      <div className="form">
        <button onClick={this.props.onClick}>X</button>
        <div className="block8"></div>
        <span className="formText">Title</span>
        <div className="block"></div>
        <input
          id="titleBox"
          className="invalid"
          onChange={this.titleChange}
        ></input>
        <div className="block"></div>
        <span className="formText">Author</span>
        <div className="block"></div>
        <input className="invalid" onChange={this.authorChange}></input>
        <div className="block"></div>
        <span className="formText">Pages</span>
        <div className="block"></div>
        <input
          className="invalid"
          type="number"
          onChange={this.pagesChange}
        ></input>
        <div className="block"></div>
        <span className="formText">Read?</span>
        <input
          className="readInput"
          type="checkbox"
          onChange={this.readChange}
        ></input>
        <div className="block"></div>
        <button id="submitButton" onClick={this.props.onClick}>
          Submit
        </button>
      </div>
    );
  }
}

export default App;
