import React from 'react'

class Button extends React.Component {
    render(){
        return (
            <div style={{float: this.props.pos, cursor:"pointer"}}>{this.props.symbol}</div>
        );
    }
}

class Element extends React.Component {
    render(){
        return (
            <td>{this.props.element}</td>
        );
    }
}

class DoubleRow extends React.Component {
    render(){
        return (
            <tr>
                <Element element={this.props.first}/>
                <Element element={this.props.second}/>
            </tr>
        );
    }
}

class SingleRow extends React.Component {
    render(){
        return(
            <tr><td >{this.props.element}</td></tr>
        );
    }
}

class RecipeCard extends React.Component {
    render(){
        let image, instructions;
        let ingredientTable = [];
        let sliceNbr = [8,6];
        if(this.props.image){
            image = <img src={this.props.image} style={{height: 76, display:"block", marginLeft:"auto", marginRight:"auto"}}/>;
            sliceNbr = [4,2];
        }
        let ingredients = this.props.ingredients.slice(0,sliceNbr[0]);
        for (var index = 0; index < ingredients.length; index= index+2) {
                ingredientTable.push(<DoubleRow first={ingredients[index]} second={ingredients[index+1]} key={ingredients[index]+ingredients[index+1]} />);
        }

        return(
            <div className={"RecipeCard"} style={{borderColor:this.props.color}}>
                <div className={"inner"}>
                <Button symbol={"✕"} pos={"right"}/>
                <Button symbol={"🌿"} pos={"left"}/>
                <h4>{this.props.recipeName}</h4>
                
                {image}
                <h5 style={{lineHeight:"0px"}}>Ingredients</h5>
                <div className={"body"}>
                    <table>
                        <tbody>
                        {ingredientTable}
                        </tbody>
                    </table>
                </div>
                <h5 style={{lineHeight:"0px"}}>Instructions</h5>
                <div className={"body"}>
                    <table>
                        <tbody>
                            {this.props.instructions.slice(0,sliceNbr[1]).map(element => <SingleRow key={element} element={element}/>)}
                        </tbody>
                    </table>
                    </div>
                 </div>
                 </div>
        );
    }
}

class RecipeCards extends React.Component {
    render(){
        return(
            <div>
                {this.props.recipes.map((element, index) => <RecipeCard {...element}/>)}
            </div>
        );
    }
}

export class RecipeDeck extends React.Component {
    render(){
        return (
            <div className={"RecipeDeck"} style={{float: "left"}}>
                <h2>Recipe Deck</h2>
                <div className={"sub"}>
                    <RecipeCards recipes={this.props.recipes}/>
                </div>
            </div>
        );
    }
}

