function createUrl() {

    let msg = '';

    for (let s of Global.segments) {
        if (s instanceof Index == false) {
            msg += `${Global.colors.indexOf(s.fill)}*`;
        }
    }

    msg = msg.slice(0, msg.length - 1);
    msg = `localhost:5500/?save=${msg}`;
    // msg = `https://mzmix.github.io/projects/wuzk/?save=${msg}`;

    copyUrl(msg);
}


function copyUrl(text) {
    let holder = document.createElement("input");
    document.body.appendChild(holder);
    holder.setAttribute('value', text);
    holder.select();

    document.execCommand("copy");
    document.body.removeChild(holder);

    alert('Link skopiowany do schowka!');
}