import React from 'react'
import { Tree } from "./treeRecipe"

/**Order: From Small to Big */
/* FIELDS FOR TEXT CARD*/
const Button = ({symbol})=>{
        return (
            <div style={{paddingLeft:15, paddingTop:10, float: "right", display: "inline-block", fontSize: 19}}>{symbol}</div>
        );
}

const Element = ({element}) =>{
        return (
            <td>{element}</td>
        );
    };

const DoubleRow = ({first, second}) => {
        return (
            <tr>
                <Element element={first}/>
                <Element element={second}/>
            </tr>
        );
}

const SingleRow = ({element})=> {
        return(
            <tr><td >{element}</td></tr>
        );
}

const Image = ({image}) => {
    return  (
        <div className="img-wrapper">
                <img src={image} alt="image of food" />
        </div>
);
}

const TextCard = ({image, ingredients, recipeName, color, instructions}) => {
    let ingredientTable = [];
    let showImage;
    if (image) {
        showImage = <Image image={image} />;
    }
    for (var index = 0; index < ingredients.length; index = index + 2) {
        ingredientTable.push(<DoubleRow first={ingredients[index]} second={ingredients[index + 1]} key={ingredients[index] + ingredients[index + 1]} />);
    }

    return (


        <div className={"details mdc-card__supporting-text"}>
            {showImage}
            <div>
                <div>
                    <h2>Ingredients</h2>
                    <table>
                        <tbody>
                            {ingredientTable}
                        </tbody>
                    </table>
                </div> 
            </div>
            <div>
                <h2>Instructions</h2>
                    <table>
                        <tbody>
                            {instructions.map(element => <SingleRow key={element} element={element}/>)}
                        </tbody>
                    </table>
            </div>
        </div>


    );
}


/**PUTTING EVERYTHING TOGETHER */

class RecipeCard extends React.Component{
    render(){
        console.log(this.props)
        let element;
        if(false)
            element = <TextCard {...this.props.element}/>;
        else element = <Tree data={this.props.trees} height={260} width={200}/>;

        return(
        <div className="container">
             <div className="header" style={{background: this.props.element.color}}>
                <h2 style={{display: "inline-block"}}>{this.props.element.recipeName}</h2>
                <Button symbol={"✕"}/>
            </div> 
            {element}
            <div className={"footer"}>
                <Button symbol={"▶︎"}/>
            </div>
        </div>
        );
    }
}


const RecipeCards = ({recipes, trees}) => {
        return(
            <div>
            <div className={"my-card-container"}>
                {recipes.map((element, index) => <RecipeCard element={element} trees={trees}/>)}
            </div>
            </div>
        );
}

export const RecipeDeck = ({recipes, data}) => {
        return (
            <div className={"RecipeDeck"}>
                <h2>Recipe Deck</h2>
                <div className={"subDeck"}>
                    <RecipeCards recipes={recipes} trees={data}/>
                </div>
            </div>
        );
}
