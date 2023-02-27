//Valor inicial que define a quantidade inicial de pokemons que será exibida, em seguida é chamada a função principal 
var valuePokemons = "50";
capturarPokemons(valuePokemons);
var pokemons =[]; //criando o ARRAY para armazenar os pokemons 



//Função para atualizar a quantidade de pokemons que será exibida
document.querySelector('input[type=number]').addEventListener('input',()=>{
    var qtdPokemons = document.querySelector('input[name=qtd]');
    var valuePokemons = qtdPokemons.value
    
    capturarPokemons(valuePokemons);
    
});



//Função principal 
function capturarPokemons(qtd){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+qtd)
        .then(response => response.json())
        .then(allpokemon => {
            var pokemons =[]           

            //capturando e adicionando o nome dos pokemons ao array
            allpokemon.results.map((value)=>{
                
                fetch(value.url)
                    .then(response => response.json())
                    .then(pokemonSingle => {                
                        pokemons.push({nome:value.name, imagem:pokemonSingle.sprites.front_default, type:pokemonSingle.types[0].type.name, abilities:pokemonSingle.abilities[0].ability.name});
                        //console.log(pokemons[0]);

                        //validando, pois funciona de forma assincrona 
                        if(pokemons.length == qtd){ 

                            var cards = document.querySelector(".cards");
                            cards.innerHTML = ""
                            

                            pokemons.map(function(value){
                                cards.innerHTML+=`<div class="pokemon-card">            
                                <img src="`+value.imagem+`" alt="">
                                <div class="info">
                                    <p>`+value.nome[0].toUpperCase() + value.nome.substring(1)+`</p>
                                    <span>Type : <span class="type">`+value.type+`</span></span>
                                    <span>Abilities : `+value.abilities+`</span>
                                </div>`
                                
                                

                            })
                        
                        
                            function verifica(){
                                var types = document.querySelectorAll(".type");
                                
                                types.forEach(function(element){
                                    var type = element.innerHTML
                                    if(type == "grass"){                                        
                                        element.classList.add("typeGrass")
                                    }else if(type == "fire"){
                                        element.classList.add("typeFire")
                                    }else if(type == "water"){
                                        element.classList.add("typeWater")
                                    }else if(type == "bug"){
                                        element.classList.add("typeBug")
                                    }else if(type == "poison"){
                                        element.classList.add("typePoison")
                                    }else if(type == "electric"){
                                        element.classList.add("typeElectric")
                                    }else if(type == "ground"){
                                        element.classList.add("typeGround")
                                    }
                                })
                                
                            }

                            verifica();
                        
                            //Função de busca 
                            const searchInput = document.querySelector(".search-bar input");
                            const cardsSingle = document.querySelectorAll(".cards .pokemon-card")

                            searchInput.addEventListener('input', filterCards);

                            function filterCards(){
                                if(searchInput.value != ""){
                                    
                                    for(let card of cardsSingle){

                                        let pokemonName = card.querySelector("p");
                                        pokemonName = pokemonName.textContent.toLowerCase();
                                        let textInput = searchInput.value.toLowerCase()
                                        
                                        
                                        if(!pokemonName.includes(textInput)){
                                            card.style.display = "none";

                                        }else{
                                            card.style.display = "flex";
                                        }

                                    }
                                    

                                }else{
                                    for(let card of cardsSingle){
                                        card.style.display = "flex"
                                        
                                    }

                                }
                                
                            }
                            
                            
                                                    
                        }//fim do if
                        
                    })
            })            
        })
}
