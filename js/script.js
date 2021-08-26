const dropZone = document.getElementById("drop-zone");
const fileInputField = document.getElementById("files-input");
const uploadedFiles = document.getElementById("files");

const highlight = function () {
    dropZone.classList.add("highlight");
};
const unHighlight = function () {
    dropZone.classList.remove("highlight");
};

const dropHandler = function (event) {
    let data = event.dataTransfer;
    let fileList = data.files;
    handleFiles(fileList);
};

const browseHandler = function () {
    handleFiles(fileInputField.files);
};

const handleFiles = function (fileList) {
    const files = [...fileList];
    files.forEach((file) => {
        createFileElement(file);
    });
};



// CREATE FILE ITEM ELEMENT TO ADD TO UPLOADED FILE SECTION
const createFileElement = function (file) {
    //FILE ELEMENT
    let fileElement = document.createElement("div");
    fileElement.className = "file";
    fileElement.setAttribute("id", file.name);

    console.log(file);
    fileElement.innerHTML = `
    <div class="thumb">
        <i class="far fa-file-image" aria-hidden="true"></i>
    </div>
    <div class="file-info">
        <div class="flex justify-between">
            <p class="file-name truncate"><span>${calculateFileSize(file.size)}</span> ${file.name} </p>
            <p class="file-status">Uploading</p>
        </div>
        <progress id="file-progress" value="1" max="100">65%</progress>
    </div>
    `;

    uploadedFiles.appendChild(fileElement);
};

//CALCULATES FILE SIZE IN DIFFERRENT UNIT AND RETURN A FORMATED STRING.
const calculateFileSize = function (fileSize) {
    const units = ["Byte", "KB", "MB", "GB", "TB"];
    let fileUnit = 0;
    let size = fileSize;
    while (size > 1024) {
        size = size / 1024;
        fileUnit++;
    }
    return `(${size.toFixed(1)}${units[fileUnit]}) `;
};

//ADDING EVENT LISTENERS TO DROP ZONE
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

fileInputField.addEventListener("change", browseHandler);
