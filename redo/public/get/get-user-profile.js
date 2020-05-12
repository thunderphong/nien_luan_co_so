
if(!localStorage.getItem("jwtToken")) {
    window.location.href = "http://localhost:3000/login";
}else {
    const token = localStorage.getItem("jwtToken");
    const form = document.getElementById("profile");
    axios.get("http://localhost:3000/user/get-profile/" + form["account"].value , {
        headers: {
            "Authorization": token
        }
    }).then(res=>{
        console.log(res.data);
        
        const {account, name, fname, email, tel, } = res.data;
        form["name"].value = name;
        form["fname"].value = fname;
        form["email"].value = email;
        form["tel"].value = tel;
    }).catch(err=> {
        console.log(err.response)
    })
}