const dropZone = document.getElementById("drop-zone");
const uploadedFiles = document.getElementById("files");

const highlight = function () {
    dropZone.classList.add("highlight");
};
const unHighlight = function () {
    dropZone.classList.remove("highlight");
};

// CREATE FILE ITEM ELEMENT TO ADD TO UPLOADED FILE SECTION
const createFileElement = function () {
    //FILE ELEMENT
    let file = document.createElement("div");
    file.className = "file flex flex-1 p-8 shadow-md border border-1 border-gray-100 rounded mb-3";

    //ICON INSILE FILE ELEMENT
    let icon = document.createElement("i");
    icon.className = "far fa-file-image text-5xl text-blue-400 pr-8";

    //FILE INFO ELEMENT
    let fileInfo = document.createElement("div");
    fileInfo.className = "file-info w-full";

    //NAME , SIZE STATUS INFO INSIDE FILE INFO
    let fileTextInfo = document.createElement('div');
    fileTextInfo.className = 'flex justify-between';

    let fileName = document.createElement('p');
    fileName.className = 'file-name text-lg font-bold text-gray-400';
    fileName.innerText = 'profilepic.png';

    let fileStatus = document.createElement('p');
    fileStatus.className = 'file-status text-right text-lg font-bold text-red-300';
    fileStatus.innerText = 'Completed';

    fileTextInfo.appendChild(fileName);
    fileTextInfo.appendChild(fileStatus);
    
    //PROGRESS BAR ELEMENT
    let progress = document.createElement('progress');
    progress.setAttribute('id', 'file-progress');
    progress.setAttribute('max', '100');
    progress.setAttribute('value', '45');
    progress.innerText = '45%';

    fileInfo.appendChild(fileTextInfo);
    fileInfo.appendChild(progress);

    file.appendChild(icon);
    file.appendChild(fileInfo);


    uploadedFiles.appendChild(file);
};

const dropHandler = function (event) {
    let data = event.dataTransfer;
    console.log(data.files);
    createFileElement();
};



//ADDING EVENLISTENERS TO DROP ZONE
const eventsToAdd = ["drop", "dragenter", "dragover", "dragleave"];
for (let eventName of eventsToAdd) {
    dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
}

dropZone.addEventListener("dragenter", highlight);
dropZone.addEventListener("dragover", highlight);

dropZone.addEventListener("dragleave", unHighlight);
dropZone.addEventListener("drop", unHighlight);

dropZone.addEventListener("drop", dropHandler);
