const BLOG_ENDPOINT = "https://desafiojs-5d832-default-rtdb.firebaseio.com";
//console.log("blog view")
let queryString = location.search;

let params = new URLSearchParams(queryString);
//console.log(params);

let entryKey = params.get("entryKey");
//console.log(entryKey);

let divCarComments = document.getElementById("entry-card-comments")
let divTagsWrapper = document.getElementById("tagsWrapper")
let divDescriptionWrapper = document.getElementById("entry-content")
let commentButtom = document.getElementById("commentButtom")
let today = new Date()

const getDataById = async (entryKey) => {
    let response = await fetch(`${BLOG_ENDPOINT}/${entryKey}/.json`);
    let data = await response.json();
    //console.log(data)

    let {comments, comments_count, date, id, name, imgprofile, tags, title, key, img, description} = data
    let descArray = description.split(".")
    descArray.pop()

    document.getElementById("titleHTML").textContent = title;
    document.getElementById("entry-cover").src = img;
    document.getElementById("entry-profile-pic").src = imgprofile;
    document.getElementById("entry-title").textContent = title;
    document.getElementById("entry-author").textContent = `${name} • ${date}`;
    document.getElementById("entry-comments-number").textContent = `Comments (${comments_count})`

    commentButtom.addEventListener("click", async () => {
        let newComment = document.getElementById("newComment").value;

        let newCommentObjet = {
            comment_date: `Nov ${today.getDate()}`, 
            comment_name: "Koder_1", 
            comment_profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
            comment_text: newComment};
        
        comments.push(newCommentObjet)

        let response = await patchComment(comments,entryKey);
        console.log(response);
       location.reload();
        
    })

    breakLineContent(descArray)
    //document.getElementById("entry-content").innerText = descArray;

    createTags(tags)

    createCommentSection(comments)
}

const breakLineContent = (descArray) => {
    divDescriptionWrapper.innerHTML = "";

    descArray.forEach(element => {
        let pParag = document.createElement("p")
        pParag.classList.add("text-justify")
        pParag.textContent = element.concat(".");

        divDescriptionWrapper.append(pParag)
    })
}

const createTags = (tags) => {
    divTagsWrapper.innerHTML = "";

    tags.forEach(element => {
        let divTag = document.createElement("div")
        divTag.classList.add("mx-3")
        //divTag.classList.add("")
        
        let pTag = document.createElement("p")
        pTag.classList.add("card-text")
        pTag.setAttribute("id","tagHover")
        pTag.textContent = `#${element}`

        divTag.append(pTag)
        divTagsWrapper.append(divTag)
    })
}

const createCommentSection = (comments) => {
    divCarComments.innerHTML = "";
    
    comments.forEach(element => {
        let divCard = document.createElement("div")
        divCard.classList.add("mb-1")

        let divCarBody = document.createElement("div")
        divCarBody.classList.add("row","g-0")

        let divCol = document.createElement("div")
        divCol.classList.add("col-md-1")

        let imgPic = document.createElement("img");
        imgPic.classList.add("rounded-circle")
        imgPic.setAttribute("id", "entry-comment-pic")
        imgPic.setAttribute("src",element.comment_profilePic);

        let divColComment = document.createElement("div")
        divColComment.classList.add("card", "col-md-11","p-4", "mb-3")

        let pAuthor = document.createElement("p")
        pAuthor.classList.add("card-text")
        pAuthor.textContent = `${element.comment_name} • ${element.comment_date}`;

        let pText = document.createElement("p")
        pText.classList.add("card-text", "mb-2")
        pText.textContent = element.comment_text;

        divColComment.append(pAuthor,pText)
        divCol.append(imgPic)
        divCarBody.append(divCol,divColComment)
        divCard.append(divCarBody)
        divCarComments.append(divCard)
    });
}

getDataById(entryKey)

const patchComment = async (newArray,entryKey) => {
    let response = await fetch(`${BLOG_ENDPOINT}/${entryKey}/comments/.json`,{
        method: "PUT",
        body: JSON.stringify(newArray)
    })
    let data = await response.json()
    return data
};

let devLogo = document.getElementById("logo-nav")
devLogo.addEventListener("click",() => {
  window.open("../index.html")
})

//Parte Navabar Login
const logOut = () => {
    localStorage.removeItem("token");
}
let token = localStorage.getItem("token");
console.log(token) 

let btnLogout = document.getElementById("btn-logout");
let btnLogin = document.getElementById("btn-login");
let btnCreate = document.getElementById("btn-create");
let btnPost = document.getElementById("btn-post");

const view = () =>{
    if (token ){
        btnLogout.classList.remove("d-none");
        btnPost.classList.remove("d-none");
        btnLogin.classList.add("d-none");
        btnCreate.classList.add("d-none");
    } else {}
}

view()

btnLogout.addEventListener("click", () => {
    logOut()
    window.open(`blogView.html?entryKey=${entryKey}`,"_blank")
});
