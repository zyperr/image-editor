const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filters button"),
filteName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filters"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");



let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0,flipHorizontal =1, flipVertical = 1;
const applyFilters = () =>{
    previewImg.style.transform =`rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


const loadImage = () =>{
    let file = fileInput.files[0]; // Toma la iamgen seleccionada por el usuario
    if(!file) return;// SI el usuario no selecciona un archivo vuelve 
    previewImg.src = URL.createObjectURL(file); // Pasando el archivo URL a imagen para mostralo como vista previa.
    previewImg.addEventListener("load", () =>{
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}

filterOptions.forEach(option =>{
    option.addEventListener("click",()=>{ // Se agrega el evento del click a todos los botones
        document.querySelector(".filters .active").classList.remove("active");
        option.classList.add("active");
        filteName.innerHTML = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max ="200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}`;
        }else if(option.id === "saturation"){
            filterSlider.max ="200";
            filterSlider.value = brightness;
            filterValue.innerText = `${saturation}`;
        }else if(option.id === "inversion"){
            filterSlider.max ="100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}`;
        }else{
            filterSlider.max ="100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}`;
        }
    })
})

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filters .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilters();
}
rotateOptions.forEach(option =>{
    option.addEventListener("click", ()=>{ // Se agrega el evento del click a todos los botones
        if(option.id === "left"){
            rotate -= 90; 
        }else if(option.id === "right"){
            rotate += 90;
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1? -1 :1;
        }else{
            flipVertical = flipVertical === 1? -1 :1;
        }
        applyFilters();
    });
});

const resetFilter = () =>{
    // Reinicia la imagen a sus valores por defecto
    brightness = 100;  saturation = 100;  inversion = 0;  grayscale = 0;
    rotate = 0; flipHorizontal =1;  flipVertical = 1;
    filterOptions[0].click();
    applyFilters();
}
const saveImage = () =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180); 
    }
    ctx.scale(flipHorizontal,flipVertical);
    ctx.drawImage(previewImg,-canvas.width / 2,-canvas.height / 2,canvas.width,canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click",() => fileInput.click());
