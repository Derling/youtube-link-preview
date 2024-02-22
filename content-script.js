// youtube constants
YOUTUBE_URL_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/; // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
YOUTUBE_ID_REGEX_INDEX = 7;
YOUTUBE_ID_LENGTH = 11;


// 7tv constants
USER_MESSAGE_SPAN_CLASS = "seventv-user-message";
USER_MESSAGE_ID_ATTRIBUTE = "msg-id";
PREVIEW_ID_PREFIX = "twitch-yt";

function createIframe(videoId, elementId) {
    // allow is part of the default html from video pages, just copying it over to have similar behavior
    const iframe = document.createElement("iframe");
    iframe.height = 300;
    iframe.width = 300;
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.id = elementId;
    return iframe
}


function getVideoId(match) {
    if(!(match && match[YOUTUBE_ID_REGEX_INDEX].length === YOUTUBE_ID_LENGTH)) {
        return;
    }
    return match[YOUTUBE_ID_REGEX_INDEX];
}

function handleMouseOver(event) {
    const match = event.target.innerHTML.match(YOUTUBE_URL_REGEX);
    if (match === null) {
        return;
    }

    let element = event.fromElement;
    if (element.className !== USER_MESSAGE_SPAN_CLASS) {
        return;
    }

    const videoId = getVideoId(match);
    const msgId = element.getAttribute(USER_MESSAGE_ID_ATTRIBUTE);
    const elementId = `${PREVIEW_ID_PREFIX}-${videoId}-${msgId}`;

    if (document.getElementById(elementId) !== null) {
        return;
    }

    element = element.parentElement;
    element.appendChild(createIframe(videoId, elementId));
}

document.addEventListener("mouseover", (e) => handleMouseOver(e));
