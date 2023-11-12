import $ from "jquery";

function mark(e, l, v) {

    if (!$(e).is(":checked")) {
        let i = l.indexOf(v)
        if (i > -1) {
            l.splice(i, 1);
        }
    } else {
        let i = l.indexOf(v)
        if (i < 0) {
            l.push(v)
        }
    }

    
}
function unmark(l, v) {
    let i = l.indexOf(v)
    if (i > -1) {
        l.splice(i, 1);
    }
}

export { mark, unmark }