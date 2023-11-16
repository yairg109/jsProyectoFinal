


/*
let post_public = "https://desafiojs-5d832-default-rtdb.firebaseio.com/usersList/-NiphWXA0DuPtYPlUyod";
let usersWrapper = document.getElementById("users-wrapper");
const getAllEntries = async () => {
    let response = await fetch(`${post_public}/.json`);
    let data = await response.json();
    let transformedData = Object.entries(data).reduce((accum,current,index) => {
        return [...accum,{key:index, ...current[1] }];
    },[]);
    postEntries = transformedData;
    if (postEntries) {
        printAllEntries(postEntries);
    }
    
}
*/




let postEntries = [];

document.querySelectorAll("#post-form input").forEach((input) => {
  input.addEventListener("focus", () => {
    document.getElementById("form-alert").classList.add("d-none");
  });
});

const createPostObject = () => {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let name = document.getElementById("name").value;
  let img = document.getElementById("img").value;
  let imgprofile = document.getElementById("img-profile").value;
  let date = document.getElementById("date").value;
  let tagsValue = document.getElementById("tags").value;
  let tags = tagsValue.split(",");
  let comments_count = document.getElementById("name").value;
  let comments= [{comment_name: "Giovanni Matteo",
                        comment_profilePic: `https://randomuser.me/api/portraits/men/1.jpg`,
                        comment_text: "Thanks for this list. I have never heard some of them before. Since you mentioned Beekeper, I thought it could be interesting to add Retable to this list - it's an Airtable alternative but with a one-time payment. You can also add addons on top to boost with several features. There are several developers connecting Retable with 3rd party APIs to store lots of company data.",
                        comment_date: "Nov 1"},
                        {
                            comment_name: "Jhon Alessandro",
                            comment_profilePic: `https://randomuser.me/api/portraits/men/2.jpg`,
                            comment_text: "This is indeed useful for those working with lots of JSON! :+1::100: Thanks for the valuable addition, Jairon! :rezo::corazón_refulgente:",
                            comment_date: "Nov 2"
                        },
                        {
                            comment_name: "Nacho Colomina Torregrosa",
                            comment_profilePic: `https://randomuser.me/api/portraits/men/3.jpg`,
                            comment_text: "Awesome list, Typora is paid and I've been using it. But for those who want, Obsidian is also a markdown editor that's really awesome.",
                            comment_date: "Nov 3"
                        },
                        {
                            comment_name: "Liyas Thomas",
                            comment_profilePic: `https://randomuser.me/api/portraits/men/4.jpg`,
                            comment_text: "Fantastic list! I'll mention Obsidian and StackEdit as free alternatives to Typora, both of which I love working with :manos_levantadas:",
                            comment_date: "Nov 6"
                        }];

  // let profile_image = document.getElementById("profile_image").value;
  
  let postObject = { title, description, name,img ,imgprofile,date,tags,comments_count,comments};
  if (title && description && description) {
    return postObject;
  } else {
    document.getElementById("form-alert").classList.remove("d-none");
  }
};



const createPostInDb = async (postObject) => {
  //let postCount = 15
  //https://desafiojs-5d832-default-rtdb.firebaseio.com/usersList/{postCount}/.json
  let response = await fetch(
    
    "https://desafiojs-5d832-default-rtdb.firebaseio.com/.json",
    {
      method: "POST",
      body: JSON.stringify(postObject),
    }
  );
  let data = await response.json();
  return data;
};


const getAllEntries = async () => {
  let postWrapper = document.getElementById("post-wrapper");
  postWrapper.innerHTML = "";
  let response = await fetch("https://desafiojs-5d832-default-rtdb.firebaseio.com/.json");
  let data = await response.json();
  let transformedData = Object.entries(data).reduce((accum,current) => {
      return [...accum,{key:current[0], ...current[1] }];
  },[]);
  postEntries = transformedData;
  console.log("soy publicaciones",postEntries);
  
  if (postEntries) {
      printAllPost(postEntries);
  }
   
}

getAllEntries();

const savePost = async () => {
  let postObject = createPostObject();
  console.log(postObject);
  if (postObject) {
    let response = await createPostInDb(postObject);
    console.log(response);
    getAllEntries();
  }
};

let saveProductBtn = document.getElementById("save-post");

saveProductBtn.addEventListener("click", savePost);

const createPostCard = (entryData) => {

  let { title, description, name, img, date, imgprofile,tags,key } = entryData;
  //let resultado_tag;  
  
  console.log(entryData);
  // console.log('hola soy el nuevo',resultado_tag)

  let userCol = document.createElement("div");
  userCol.classList.add("col");

  let userCard = document.createElement("div");
  userCard.classList.add("card","mb-4");

  let upImage = document.createElement("img");
  upImage.classList.add("img-up");
  upImage.src = img;

  upImage.setAttribute("alt", "Foto del post");

  let userImage = document.createElement("img");
  userImage.classList.add("card-img-top","rounded-circle","img-size");
  userImage.setAttribute("src","imgprofile");  // userData.picture.large
  userImage.setAttribute("alt", "Foto del post");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body","text-center");

  let cardComents = document.createElement("p");
  cardComents.classList.add("card-text","text-center","pt-3","h4");
  cardComents.textContent = title;

  let productTags = document.createElement("div");
  productTags.classList.add("d-flex", "gap-3", "flex-wrap");
  tags.forEach((tag) => {
    productTags.innerHTML =
      productTags.innerHTML +
      `
    <span class="badge text-bg-info">${tag}</span>
    `;
  });

  
  let divTags = document.createElement("div");
  divTags.classList.add("card-body","text-center");
  
  tags.forEach((tag) => {
    let cardTag = document.createElement("a");
    cardTag.classList.add("p-1","h6","ancla_tag1","rounded");
    cardTag.setAttribute("href", "#");
    cardTag.textContent = tag
    divTags.append(cardTag)  
   
  });

  let imageProfile = document.createElement("div");
  imageProfile.classList.add("row");

  let imageProfileCol= document.createElement("div");
  imageProfileCol.classList.add("col","d-flex");

  let dateTitle= document.createElement("div");
  dateTitle.classList.add("d-flex","flex-column","margin-right","mb-3");

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title","m-0","h6");
  cardTitle.textContent = name;

  let cardDate = document.createElement("p");
  cardDate.classList.add("card-text","m-0","h6");
  cardDate.textContent = date;

  dateTitle.append(cardTitle,cardDate)

  imageProfileCol.append(userImage,dateTitle)

  imageProfile.append(imageProfileCol)

  

  cardBody.append(imageProfile,cardComents,divTags);

  userCard.append(upImage, cardBody);

  userCol.append(userCard);
  return userCol;
};

// const createUserCard = (entryData) => {
//   let { title, profile_image, name, img, date, tags, key } = entryData;
//   //let resultado_tag; 
//   //console.log(entryData);
//   // console.log('hola soy el nuevo',resultado_tag)
//   let userCol = document.createElement("div");
//   userCol.classList.add("col");
//   // Se agrega un addEventListener --- Ricardo
//   userCol.addEventListener("click",() => {
//     window.open(`views/blogView.html?entryKey=${key}`,"_blank")
//   })

//   let userCard = document.createElement("div");
//   userCard.classList.add("card","mb-4");
//   let upImage = document.createElement("img");
//   upImage.classList.add("img-up");
//   upImage.src = img;
//   upImage.setAttribute("alt", "Foto del post");
//   let userImage = document.createElement("img");
//   userImage.classList.add("card-img-top","rounded-circle","img-size");
//   userImage.src = profile_image;  // userData.picture.large
//   userImage.setAttribute("alt", "Foto del post");
//   let cardBody = document.createElement("div");
//   cardBody.classList.add("card-body","text-center");
//   let cardComents = document.createElement("p");
//   cardComents.classList.add("card-text","text-center","pt-3","h4");
//   cardComents.textContent = title;
//   let divTags = document.createElement("div");
//   divTags.classList.add("card-body","text-center");
//   tags.forEach((tag) => {
//     let cardTag = document.createElement("a");
//     cardTag.classList.add("p-1","h6","ancla_tag1","rounded");
//     cardTag.setAttribute("href", "#");
//     cardTag.textContent = tag //`#${tag}`
//     divTags.append(cardTag)
//   //   resultado_tag = tag;   
//   });
//   // tags.forEach(function(tag) {
//   //   let cardTag = document.createElement("a");
//   //   cardTag.classList.add("p-1","h6","ancla_tag1","rounded");
//   //   cardTag.setAttribute("href", "#");
//   //   cardTag.textContent = tag
//   //   divTags.append(cardTag) 
//   // //   resultado_tag = tag;   
//   // });
//   // let cardTags = document.createElement("a");
//   // cardTags.classList.add("p-1","h6","ancla_tag","rounded");
//   // cardTags.setAttribute("href", "#");
//   // cardTags.innerText = `#${tags[0]}`;
//   // let cardTags1 = document.createElement("a");
//   // cardTags1.classList.add("p-1","h6","ancla_tag1","rounded");
//   // cardTags1.setAttribute("href", "#");
//   // cardTags1.innerText = `#${tags[1]}`;
//   // let cardTags2 = document.createElement("a");
//   // cardTags2.classList.add("p-1","h6","ancla_tag2","rounded");
//   // cardTags2.setAttribute("href", "#");
//   // cardTags2.innerText = `#${tags[2]}`;
//   // let cardTags3 = document.createElement("a");
//   // cardTags3.classList.add("p-1","h6","ancla_tag3","rounded");
//   // cardTags3.setAttribute("href", "#");
//   // cardTags3.innerText = `#${tags[3]}`;
//   let imageProfile = document.createElement("div");
//   imageProfile.classList.add("row");
//   let imageProfileCol= document.createElement("div");
//   imageProfileCol.classList.add("col","d-flex");
//   let dateTitle= document.createElement("div");
//   dateTitle.classList.add("d-flex","flex-column","margin-right","mb-3");
//   let cardTitle = document.createElement("h5");
//   cardTitle.classList.add("card-title","m-0","h6");
//   cardTitle.textContent = name;
//   let cardDate = document.createElement("p");
//   cardDate.classList.add("card-text","m-0","h6");
//   cardDate.textContent = date;
// //   let cardButton = document.createElement("a");
// //   cardButton.classList.add("btn", "btn-primary");
// //   cardButton.setAttribute("href", "#");
// //   cardButton.innerText = "Go somewhere";
// //   let checkbox = document.createElement("input");
// //   checkbox.setAttribute("type", "checkbox");
// //   checkbox.checked = true;
// //   console.log(checkbox);
//   dateTitle.append(cardTitle,cardDate)
//   imageProfileCol.append(userImage,dateTitle)
//   imageProfile.append(imageProfileCol)
//   cardBody.append(imageProfile,cardComents,divTags);
//   userCard.append(upImage, cardBody);
//   userCol.append(userCard);
//   return userCol;
// };


const printAllPost = (entriesArray) => {
  let postWrapper = document.getElementById("post-wrapper");
  postWrapper.innerHTML = "";
  entriesArray.forEach((entry) => {
    let entryCard = createPostCard(entry);
    postWrapper.append(entryCard);
  });
};

getAllEntries();
// const printAllEntries = (entriesArray) => {
//   usersWrapper.innerHTML = "";
//   entriesArray.forEach((entry) => {
//     let entryCard = createUserCard(entry);
//     usersWrapper.append(entryCard);
//   });
// };
// getAllEntries();

let relevantButtom = document.getElementById("relevantButtom")
let latestButtom = document.getElementById("latestButtom")
let topButtom = document.getElementById("topButtom")

topButtom.addEventListener("click",() => {
  //console.log(postEntries)
let topCommentsArray = postEntries.sort(sortTopCriteria)
printAllEntries(topCommentsArray)

});

relevantButtom.addEventListener("click",() => {
  location.reload()
});

latestButtom.addEventListener("click",() => {
  let latestArray = postEntries.sort(sortLatestCriteria)
  console.log(latestArray)
  printAllEntries(latestArray)
})

const sortTopCriteria = (a, b) => {
  if (a.comments_count> b.comments_count) {
    return -1;
  }
  if (a.comments_count < b.comments_count) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const sortLatestCriteria = (a, b) => {
  if (a.date> b.date) {
    return 1;
  }
  if (a.date < b.date) {
    return -1;
  }
  // a must be equal to b
  return 0;
};
//logout
const logOut = () => {
  localStorage.removeItem("token");
  location.reload();

}

const view = () =>{
  let btnLogout = document.getElementById("btn-logout");
  let btnLogin = document.getElementById("btn-login");
  let btnCreate = document.getElementById("btn-create");
  let btnPost = document.getElementById("btn-post");

  let token = localStorage.getItem("token");
  if (token ){
    btnLogout.classList.remove("d-none");
    btnPost.classList.remove("d-none");
    btnLogin.classList.add("d-none");
    btnCreate.classList.add("d-none");
  } else {

  }
}
view()
let logOutButton = document.getElementById("btn-logout");
logOutButton.addEventListener("click", logOut);



let filterField = document.getElementById("filter-by-name");
filterField.addEventListener("keyup", (event) => {
  let filterAlert = document.getElementById("filter-alert");
  filterAlert.classList.add("d-none");

  let value = event.target.value;
  let filterResult = postEntries.filter((post) =>
    post.title.toLowerCase().includes(value.toLowerCase())
  );
  if (!filterResult.length) {
    filterAlert.classList.remove("d-none");
  }
  console.log(filterResult);
  printProductCards(filterResult);
});
