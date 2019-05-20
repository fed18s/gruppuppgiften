import IAnimal from './interfaces/IAnimal';

const animals = {

    cat: IAnimal[
        {type: cat, animal: { name: 'Fluffy', color: 'White', age: 3 } },
        {type: cat, animal: { name: 'Aslan', color: 'Gold', age: 11 } },
        {type: cat, animal: { name: 'Kitty', color: 'Grey', age: 1 } }
    ],

    pokemon: IAnimal[
        {type: pokemon, animal: { name: 'Bulbasaur', color: 'Petrol', age: 3 } },
        {type: pokemon, animal: { name: 'Pikachu', color: 'Golden yellow', age: 27 } },
        {type: pokemon, animal: { name: 'Charmander', color: 'Orange', age: 5 } },
        {type: pokemon, animal: { name: 'Blastoise', color: 'Greyish blue', age: 300 } },
        {type: pokemon, animal: { name: 'Squirtle', color: 'Turquoise', age: 8 } },
        {type: pokemon, animal: { name: 'Pidgeotto', color: 'Camel, yellow and red', age: 67 } }
    ],

    dog: IAnimal[
        {type: dog, animal: { name: 'Bosse', color: 'Brown', age: 9 } },
        {type: dog, animal: { name: 'Nemo', color: 'Black', age: 16 } },
        {type: dog, animal: { name: 'Rambo', color: 'Dotted', age: 2 } },
        {type: dog, animal: { name: 'Puck', color: 'Ginger', age: 12 } },
        {type: dog, animal: { name: 'Dude', color: 'Taupe', age: 4 } }
    ]
}

export default animals;