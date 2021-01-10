define(['durandal/app'], function (app) {
    var page = function () {
        this.displayName = 'Bem vindos ao nosso projeto!';
        this.description = 'Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.<br/>Pokémon are raised and commanded by their owners (called “Trainers”). During their adventures, Pokémon grow, level up and become more experienced and even, on occasion, evolve into stronger Pokémon.';
        this.features = [
            'Pokemóns',
            'Pokemón Species',
            'Pokemón Types',
            'Egg Groups',
        ];
    };

    return page;
});