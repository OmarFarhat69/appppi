import { getHash, onHashChange, removeHash } from "../hash.js";
import { setTitle } from "./header.js";

let container;
let headerText;
let headerButtonIcon;
let content;
let hash;

export function setModal(label = "", newContent, icon = "times", fill = false, newHash) {
    container.className = fill ? "modal-container fill" : "modal-container";
    headerText.innerText = label;
    headerButtonIcon.className = `icon fa-solid fa-${icon}`;
    content.innerHTML = "";

    hash = newHash;
    
    if (newContent) {
        if (Array.isArray(newContent)) {
            content.append(...newContent);
        } else {
            content.append(newContent);
        }
    }
}

export function showModal() {
    document.body.classList.add("modal-active");
}

export function hideModal() {
    if (hash) {
        removeHash(hash);
    }

    setModal();
    document.body.classList.remove("modal-active");
}

export function initializeModal() {
    container = document.createElement("div");
    const modal = document.createElement("div");

    const header = document.createElement("div");
    headerText = document.createElement("span");
    const headerButton = document.createElement("div");
    headerButtonIcon = document.createElement("i");
    
    content = document.createElement("div");

    container.className = "modal-container";
    modal.className = "modal";

    header.className = "modal-header";
    headerText.className = "text";
    headerButton.className = "button secondary icon-only";
    headerButtonIcon.className = "icon fa-solid fa-times";

    headerButton.append(headerButtonIcon);
    headerButton.addEventListener("click", hideModal);
    
    header.append(headerText);
    header.append(headerButton);

    content.className = "modal-content";
    
    modal.append(header);
    modal.append(content);

    container.append(modal);
    document.body.append(container);

    function handleHashChange() {
        const modalHash = getHash("modal");
        
        if (!modalHash) {
            hideModal();
            setTitle();
        }
    }

    handleHashChange();
    onHashChange(handleHashChange);
}