const dropZone = document.getElementById("drop-zone");
const uploadedFiles = document.getElementById("files");

const highlight = function () {
    dropZone.classList.add("highlight");
};
const unHighlight = function () {
    dropZone.classList.remove("highlight");
};
const dropHandler = function (event) {
    let data = event.dataTransfer;
    console.log(data.files);
};



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
