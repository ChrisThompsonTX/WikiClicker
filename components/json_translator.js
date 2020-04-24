let links = [];
let parentNode = {};
let nodes = [];
let nodeIndex = {};
let linkIndex = {};
let preparedGraph;

let dataGraph = {
    nodes: nodes,
    links: links,
};

function parseJSON() {
    document.getElementById('loading').setAttribute("style", "width:80vw");
    if (!parentNode.name) {
        parentNode = {
            name: parentObj.parse.title,
            depth: 0
        };
    } else {
        thisDepth = parentNode.depth;
        parentNode = {
            name: parentObj.parse.title,
            depth: thisDepth += 1,
        };
    }

    if (!(parentNode.name in nodeIndex)) {
        nodes.push(parentNode);
    }

    nodeIndex[parentNode.name] = true;

    parseArticlesToNodes();
    parseNodesToLinks();
    dataGraph = {
        nodes: nodes,
        links: links,
    };

    if (dataGraph.nodes.length === 0 || dataGraph.links.length === 0) {
        handleEmpty();
        reset();
    } else {
        data(dataGraph);
    }
    setTimeout(() => {
        document.getElementById('loading').setAttribute("style", "width:0vw");
    }, 300);
}

function parseArticlesToNodes() {
    document.getElementById('loading').setAttribute("style", "width:90vw");
    let articles = linksArr;
    let newNodes = [];

    articles.forEach(article => {
        let node = {
            name: article['*'],
            depth: parentNode.depth + 1
        };
        if (!(node.name in nodeIndex)) {
            nodes.push(node);
        }
        nodeIndex[node.name] = true;
    });
}

function parseNodesToLinks() {
    document.getElementById('loading').setAttribute("style", "width:100vw");
    linksArr.forEach(node => {
        let link = {
            source: parentNode.name,
            target: node['*'],
        };
        if (!(`${link.target} to ${link.source}` in linkIndex)) {
            links.push(link);
        }
        linkIndex[`${link.target} to ${link.source}`] = true;
    });
}

function reset() {
    links = [];
    parentNode = {};
    nodes = [];
    nodeIndex = {};
    parentObj = {};
    linksArr = [];
    Eve = "";

    dataGraph = {
        nodes: [],
        links: [],
    };
    data(dataGraph);
    document.getElementById('article-prev-title').innerHTML = "How to Use Wiki-Clicker";
    document.getElementById('article-prev-text').innerHTML = "Search for any destination article. Then click Start. You can pull nodes to grow the tree. The goal is to bridge the gap between the nodes!";

    document.getElementById('article-link').href = `https://github.com/kayandrewj/Archaea/blob/master/README.md`;
}