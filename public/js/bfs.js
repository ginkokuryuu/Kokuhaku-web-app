var typeCell = "src";

function cellClicked() {
    var element = event.srcElement;

    if (element.classList.contains("cell-clicked")) {
        element.classList.remove("cell-clicked", "src-cell", "dst-cell", "obstacle-cell");
    }
    else {
        element.classList.add("cell-clicked");
        if (typeCell == "src") {
            removeSrc();
            element.classList.add("src-cell");

            srcCell = element;
        }
        else if (typeCell == "dst") {
            removeDst();
            element.classList.add("dst-cell");

            dstCell = element;
        }
        else if(typeCell == "obs"){
            element.classList.add("obstacle-cell");
        }
    }
}

function changeType() {
    var id = event.srcElement.id;

    if (id == "src-btn") {
        typeCell = "src";
    }
    else if (id == "dst-btn") {
        typeCell = "dst";
    }
    else if(id == "obs-btn"){
        typeCell = "obs";
    }
}

function removeSrc() {
    var src = document.getElementsByClassName('src-cell');
    if (src[0]) {
        src[0].classList.remove("cell-clicked", "src-cell");
    }
}

function removeDst() {
    var dst = document.getElementsByClassName('dst-cell');
    if (dst[0]) {
        dst[0].classList.remove("cell-clicked", "dst-cell");
    }
}

var queue = new Queue();
var found = false;
var srcCell = null;
var dstCell = null;

function compute() {

    var src = document.getElementsByClassName('src-cell');
    if (src[0]) {
        srcCell = src[0];
    }
    var dst = document.getElementsByClassName('dst-cell');
    if (dst[0]) {
        dstCell = dst[0];
    }

    queue = new Queue();
    found = false;

    var startNode = new ListNode(srcCell);

    queue.enqueue(startNode);

    traverse();
}

function sleep(ms) {
    return (
        new Promise(function (resolve, reject) {
            setTimeout(function () { resolve(); }, ms);
        })
    );
}


function traverse() {
    //kanan, atas, kiri, bawah
    if (!found && !queue.isEmpty()) {
        var parent = queue.dequeue();
        var idString = parent.data.id;
        var id = parseInt(idString, 10);

        //kanan
        if (id % 100 != 0) {
            var item = document.getElementById(id + 1);
            if (!item.classList.contains("cell-visited") && !item.classList.contains("src-cell") && !item.classList.contains("obstacle-cell")) {
                var node = new ListNode(item);
                node.parent = parent;
                if (!item.classList.contains("dst-cell")) {
                    item.classList.add("cell-visited");
                    queue.enqueue(node);
                }
                else {
                    found = true;
                    printPath(node);
                }
            }
        }

        //atas
        if (id - 100 > 0) {
            var item = document.getElementById(id - 100);
            if (!item.classList.contains("cell-visited") && !item.classList.contains("src-cell") && !item.classList.contains("obstacle-cell")) {
                var node = new ListNode(item);
                node.parent = parent;
                if (!item.classList.contains("dst-cell")) {
                    item.classList.add("cell-visited");
                    queue.enqueue(node);
                }
                else {
                    found = true;
                    printPath(node);
                }
            }

        }

        //kiri
        if (id % 100 != 1) {
            var item = document.getElementById(id - 1);
            if (!item.classList.contains("cell-visited") && !item.classList.contains("src-cell") && !item.classList.contains("obstacle-cell")) {
                var node = new ListNode(item);
                node.parent = parent;
                if (!item.classList.contains("dst-cell")) {
                    item.classList.add("cell-visited");
                    queue.enqueue(node);
                }
                else {
                    found = true;
                    printPath(node);
                }
            }
        }

        //bawah
        if (id + 100 <= 6500) {
            var item = document.getElementById(id + 100);
            if (!item.classList.contains("cell-visited") && !item.classList.contains("src-cell") && !item.classList.contains("obstacle-cell")) {
                var node = new ListNode(item);
                node.parent = parent;
                if (!item.classList.contains("dst-cell")) {
                    item.classList.add("cell-visited");
                    queue.enqueue(node);
                }
                else {
                    found = true;
                    printPath(node);
                }
            }
        }
        sleep(10).then(traverse);
    }


}

function printPath(node) {
    if (node.parent.parent != null) {
        node = node.parent;
        node.data.classList.add("path-cell");

        sleep(100).then(printPath.bind(null, node));
    }
}

function reset() {
    var visitedCells = document.getElementsByClassName("cell-visited");
    var obstacleCells = document.getElementsByClassName("obstacle-cell");
    var arr = [];
    var count = 0;

    for (var key in visitedCells) {
        if (visitedCells.hasOwnProperty(key)) {
            arr[count] = visitedCells[key];
            count++;
        }
    }

    for (var key in obstacleCells) {
        if (obstacleCells.hasOwnProperty(key)) {
            arr[count] = obstacleCells[key];
            count++;
        }
    }

    arr.forEach(deleteVisited);
}

function deleteVisited(item) {
    item.classList.remove("cell-visited", "path-cell", "obstacle-cell", "cell-clicked");
}