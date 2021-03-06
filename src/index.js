const api = `https://randomuser.me/api`;
const addUser = document.getElementById("userAdd-btn");
const sortascbtn = document.getElementById("sortasc");
const sortdscbtn = document.getElementById("sortdsc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = title;
    this.name = `${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;
  }
}

// function User(){} -constructors intead of class
// User.prototype.method-to add the additional methods

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });

  const userDataJson = await userData.json(); //it is also asynchronous operation and a ASYNC operation
  const user = userDataJson.results[0];

  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );

  appState.push(classUser); //state has new classes
  domRender(appState);
});

const domRender = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
    Name : ${userObj.title} ${userObj.name} 
    <ol>
      <li> ${userObj.gender} </li>
      <li> ${userObj.email} </li> 
    </ol> 
    </div>`;

    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  const filterAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRender(filterAppState);
});

sortascbtn.addEventListener("click", () => {
  const tempappState = [...appState];
  tempappState.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRender(tempappState);
});

sortdscbtn.addEventListener("click", () => {
  const tempappState = [...appState];
  tempappState.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRender(tempappState);
});
