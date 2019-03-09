function createUrl() {

    let msg = '';

    for (let s of Global.segments) {
        if (s instanceof Index == false) {

            let val = Global.urlCodes[Global.colors.indexOf(s.fill)];

            msg += `${val}`;
        }
    }

    // msg = `localhost:5500/?save=${msg}`;
    // msg = `https://mzmix.github.io/projects/wuzk/?save=${msg}`;
    msg = `${document.location.origin}/?save=${msg}`;

    copyUrl(msg);
    print(msg);
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