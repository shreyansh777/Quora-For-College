document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();

    if(document.getElementById("pass").value.trim() === ""){
        alert("Don't leave this field empty");
        document.getElementById("revBox").focus();
        return false;
    
    }
    else if(document.getElementById("Ftitle").value.trim() === ""){
        alert("Don't leave this field empty");
        document.getElementById("Ftitle").focus();
        return false;
    }
    else if(document.getElementById("tnc").checked === false){
        alert("Don't leave this field empty");
        document.getElementById("tnc").focus();
        return false;
    }
    else{
        return true;
    }
})
