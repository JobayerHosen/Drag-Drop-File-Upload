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

    //ICON INSILE FILE ELEMENT
    let icon = document.createElement("i");
    icon.className = "far fa-file-image";

    //FILE INFO ELEMENT
    let fileInfo = document.createElement("div");
    fileInfo.className = "file-info";

    //NAME , SIZE STATUS INFO INSIDE FILE INFO
    let fileTextInfo = document.createElement("div");
    fileTextInfo.className = "flex justify-between";

    let fileName = document.createElement("p");
    fileName.className = "file-name truncate";

    let fileSizeElement = document.createElement("span");
    fileSizeElement.setAttribute("id", "file-size");
    fileSizeElement.innerText = calculateFileSize(file.size);

    fileName.appendChild(fileSizeElement);
    fileName.append(file.name);

    let fileStatus = document.createElement("p");
    fileStatus.className = "file-status";
    fileStatus.innerText = "Uploading";

    fileTextInfo.appendChild(fileName);
    fileTextInfo.appendChild(fileStatus);

    //PROGRESS BAR ELEMENT
    let progress = document.createElement("progress");
    progress.setAttribute("id", "file-progress");
    progress.setAttribute("max", "100");
    progress.setAttribute("value", "45");
    progress.innerText = "45%";

    fileInfo.appendChild(fileTextInfo);
    fileInfo.appendChild(progress);

    fileElement.appendChild(icon);
    fileElement.appendChild(fileInfo);

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

fileInputField.addEventListener("change", () => {
    handleFiles(fileInputField.files);
});
