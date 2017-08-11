import axios from 'axios'

const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

async function initialize(dishname = 'potatosalad') {
  // console.time('init')
  const recipes_resp = await axios.get(BASE_URL + `recipes/${dishname}`)
                             .then(resp => resp.data)
  const recipes = {}
  for (let {origin_id, ...recipeInfo} of recipes_resp) {
    recipes[origin_id] = recipeInfo
  }

  const clusters_resp = await axios.get(BASE_URL + `clusters/${dishname}`)
                                    .then(resp => resp.data)
  const clusters = {}
  for (let cluster of clusters_resp) {
    clusters[cluster.title] = {}
    for (let {recipe_id, ...coords} of cluster.points) {
      clusters[cluster.title][recipe_id] = coords
    }
  }
  // console.timeEnd('init') about 700ms
}

export default initialize;
