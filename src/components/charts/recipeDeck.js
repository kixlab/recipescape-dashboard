import React from 'react'

class Button extends React.Component {
    render(){
        return (
            <div>{this.props.symbol}</div>
        );
    }
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

const RecipeCard = ({image, ingredients, recipeName, color, instructions}) => {
        let imageComp;
        let ingredientTable = [];
        let sliceNbr = [8,6];
        if(image){
            imageComp = <img src={image} style={{height: 76, display:"block", marginLeft:"auto", marginRight:"auto"}}/>;
            sliceNbr = [4,2];
        }
        ingredients = ingredients.slice(0,sliceNbr[0]);
        for (var index = 0; index < ingredients.length; index= index+2) {
                ingredientTable.push(<DoubleRow first={ingredients[index]} second={ingredients[index+1]} key={ingredients[index]+ingredients[index+1]} />);
        }

        return(
            <div className={"mdc-card cardSize"}>
                <div className={"inner"}>
                <Button symbol={"✕"} pos={"right"}/>
                <Button symbol={"🌿"} pos={"left"}/>
                <h1 className={"mdc-card__title"}>{recipeName}</h1>
                
                {imageComp}
                <h5 className={"mdc-card__subtitle"}>Ingredients</h5>
                <div className={"mdc-card__supporting-text"}>
                    <table>
                        <tbody>
                        {ingredientTable}
                        </tbody>
                    </table>
                </div>
                <h5 className={"mdc-card__subtitle"}>Instructions</h5>
                <div className={"mdc-card__supporting-text"}>
                    <table>
                        <tbody>
                            {instructions.slice(0,sliceNbr[1]).map(element => <SingleRow key={element} element={element}/>)}
                        </tbody>
                    </table>
                    </div>
                 </div>
                 </div>
        );
}

const RecipeCards = ({recipes}) => {
        return(
            <div >
                {recipes.map((element, index) => <RecipeCard {...element}/>)}
            </div>
        );
}

export const RecipeDeck = ({recipes}) => {
        return (
            <div className={"RecipeDeck"}>
                <h2>Recipe Deck</h2>
                <div className={"subDeck"}>
                    <RecipeCards recipes={recipes}/>
                </div>
            </div>
        );
}

