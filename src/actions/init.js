import axios from 'axios'

const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"


function toD3Tree(nodes) {
    if (nodes.length === 0)
      return null
    var node = nodes[0]
    var treeData = {}
    treeData.name = node.word
    treeData.children = node.ingredient.map(function(v) { 
      return {name: v}
    })
    var next = toD3Tree(nodes.slice(1))
    if (next)
      treeData.children.push(next)
    return treeData
}

async function initialize(dishname = 'chocochip') {

  const recipes_resp = await axios.get(BASE_URL + `recipes/${dishname}`)
                             .then(resp => resp.data)
  const recipes = {}
  for (let {origin_id, ...recipeInfo} of recipes_resp) {
    recipes[origin_id] = {...recipeInfo, origin_id}
  }


  const trees_resp = await axios.get(BASE_URL + `trees/${dishname}`)
  .then(resp => resp.data)

  const trees = {}
  for (let {id, ...treeInfo} of trees_resp) {
    trees[id] = toD3Tree(treeInfo.tree.reverse())
  }
  
    

  const clusters_resp = await axios.get(BASE_URL + `clusters/${dishname}`)
                                    .then(resp => resp.data)
  const clusters = {}
  const activeClusters = {}

  for (let cluster of clusters_resp) {
    clusters[cluster.title] = {}
    activeClusters[cluster.title] = {}
    for (let {recipe_id, ...coords} of cluster.points) {
      clusters[cluster.title][recipe_id] = {...coords, recipe_id, 
        recipeName: {...recipes[recipe_id], trees: trees[recipe_id]}, 
      }

      activeClusters[cluster.title][coords.cluster_no] = coords;
    }
    let centers = Object.keys(cluster.centers).map(key => cluster.centers[key]);
    clusters[cluster.title] = {
      points: Object.keys(clusters[cluster.title]).map(key => clusters[cluster.title][key]),
      buttons: Object.keys(activeClusters[cluster.title]).map(key => true),
      centers: centers
    }
    // clusters[cluster.title].activeClusters = activeClusters;

  }
  
  return clusters;
  // console.timeEnd('init') about 700ms
}

export default initialize;
