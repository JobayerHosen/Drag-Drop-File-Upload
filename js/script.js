const dropZone = document.getElementById("drop-zone");
const fileInputField = document.getElementById("files-input");
const uploadedFiles = document.getElementById("files");
const trackUploadingFiles = {};

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

/* HANDLES FILELIST GIVEN BY DROPHANDER AND BROWSEHANDER FUNCTION.
 ADD FILES INFO TO TRACKUPLOADINGFILE OBJECT AND CALLS UPLOADFILE FUNCTION 
 PASSING THE FILE AND FILE ID IN THE OBJECT*/
const handleFiles = function (fileList) {
    const files = [...fileList];
    files.forEach((file) => {
        const fileId = createFileElement(file);
        let fileElement = document.getElementById(fileId);
        trackUploadingFiles[fileId] = {
            fileElement: fileElement,
            fileProgress: 0,
            fileContent: file,
            fileStatus: `<span class="file-status">Uploading</span>`,
        };
        uploadFile(file, fileId);
    });
};

/*UPLOADS FILE TO SERVER AND CALLS updateFileProgress FUNCTION 
ON UPLOAD PROGRESSS AND ONLOAD */
const uploadFile = function (file, fileId) {
    const url = "";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "maltipart/form-data");

    xhr.upload.addEventListener("progress", (e) => {
        let progress = Math.round((e.loaded / e.total) * 100);
        trackUploadingFiles[fileId].fileProgress = progress;
        updateFileProgress(fileId);
    });
    xhr.upload.addEventListener("load", (e) => {
        trackUploadingFiles[fileId].fileStatus = `<span class="file-status completed">Completed</span>`;
        updateFileProgress(fileId);
    });
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("OK");
        }
    });

    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
};

// UPADETE FILE PROGRESS AND STATUS TO CORRESPONDING FILE ITEM ELEMENT IN HTML
const updateFileProgress = function (fileId) {
    const fileElement = trackUploadingFiles[fileId].fileElement;
    fileElement.querySelector("#file-progress").value = trackUploadingFiles[fileId].fileProgress;
    const status = fileElement.querySelector("#file-status");
    status.innerHTML = trackUploadingFiles[fileId].fileStatus;
    status.classList.add("completed");
};

// CREATE FILE ITEM ELEMENT TO ADD TO UPLOADED FILE SECTION. ADD A ID TO IT. AND RETURN THE ID
const createFileElement = function (file) {
    const fileId = file.lastModified.toString();
    //FILE ELEMENT
    let fileElement = document.createElement("div");
    fileElement.className = "file";
    fileElement.setAttribute("id", fileId);

    fileElement.innerHTML = `
    <div class="thumb">
        <i class="far fa-file-image" aria-hidden="true"></i>
    </div>
    <div class="file-info">
        <div class="flex justify-between">
            <p class="file-name truncate"><span>${calculateFileSize(file.size)}</span> ${file.name} </p>
            <p id="file-status"><span class="file-status">Uploading</span></p>
        </div>
        <progress id="file-progress" value="1" max="100">65%</progress>
    </div>
    `;

    uploadedFiles.appendChild(fileElement);
    return fileId;
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
