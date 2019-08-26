export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listOfStudents = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/students`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listOfCompanies = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/companies`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
  console.log("User data update ", user);
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateUser = user => {
  let nn = JSON.parse(localStorage.getItem("jwt"));
  console.log(nn.user);
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      if (user._id === auth.user._id) auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
    }
  }
};

export const signupCompany = company => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup/company`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(company)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signupStudent = student => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: "GET"
  })
    .then(response => {
      console.log("signout", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
