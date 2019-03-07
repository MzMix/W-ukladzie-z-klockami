function createUrl() {

    let msg = '';

    for (let s of Global.segments) {
        if (s instanceof Index == false) {
            msg += `${Global.colors.indexOf(s.fill)}*`;
        }
    }
    msg = msg.slice(0, msg.length - 1)
    print(msg);
}