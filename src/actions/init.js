import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

//converts recieved format to tree format
function toD3Tree(nodes) {
  if (nodes.length === 0) return null;
  var node = nodes[0];
  var treeData = {};
  treeData.name = node.word;
  treeData.children = node.ingredient.map(function(v) {
    return { name: v };
  });
  var next = toD3Tree(nodes.slice(1));
  if (next) treeData.children.push(next);
  return treeData;
}

async function initialize(dishname = "chocochip") {
  const data = await Promise.all([
    // Load all recipes
    axios.get(BASE_URL + `recipes/${dishname}`).then(resp => resp.data),
    // Load all trees
    axios.get(BASE_URL + `trees/${dishname}`).then(resp => resp.data),
    // Load all clusters
    axios.get(BASE_URL + `clusters/${dishname}`).then(resp => resp.data)
  ]);
  const [recipes_resp, trees_resp, clusters_resp] = data;

  // Build recipe object from array
  const recipes = {};
  for (let { origin_id, ...recipeInfo } of recipes_resp) {
    recipes[origin_id] = { ...recipeInfo, origin_id };
  }

  // Build tree object from array
  const trees = {};
  for (let { id, ...treeInfo } of trees_resp) {
    trees[id] = {
      ...toD3Tree(treeInfo.tree.reverse()),
      length: treeInfo.tree.length
    };
  }

  // Build the cluster object from array
  const clusters = {};
  const activeClusters = {};

  for (let cluster of clusters_resp) {
    clusters[cluster.title] = {};
    activeClusters[cluster.title] = {};
    for (let { recipe_id, ...coords } of cluster.points) {
      //add recipe and tree to cluster pounts
      clusters[cluster.title][recipe_id] = {
        ...coords,
        recipe_id,
        recipeName: { ...recipes[recipe_id], trees: trees[recipe_id] }
      };
      //find out number of clusters
      activeClusters[cluster.title][coords.cluster_no] = coords;
    }
    let centers = Object.keys(cluster.centers).map(key => cluster.centers[key]);

    //define final data structure
    clusters[cluster.title] = {
      points: Object.keys(clusters[cluster.title]).map(
        key => clusters[cluster.title][key]
      ),
      buttons: Object.keys(activeClusters[cluster.title]).map(key => true),
      centers: centers
    };
  }

  return clusters;
}

export default initialize;
