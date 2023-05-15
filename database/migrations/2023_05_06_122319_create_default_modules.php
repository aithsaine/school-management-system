<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \App\Models\Module::insert([
            [
                "option_id"=>1,
                "title"=>"Se situer au regard du métier et de la démarche de formation ",
                "key"=>"M101",
                "duration"=>100,
                "coefficient"=>1
            ],
            [
                "option_id"=>1,
                "title"=>"Acquérir les bases de l’algorithmique ",
                "key"=>"M102",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>1,
                "title"=>" Programmer en Orienté Objet ",
                "key"=>"M103",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>1,
                "title"=>" Développer des sites web statiques ",
                "key"=>"M104",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>1,
                "title"=>" Programmer en JavaScript ",
                "key"=>"M105",
                "duration"=>110,
                "coefficient"=>3
            ],
            [
                "option_id"=>1,
                "title"=>" Manipuler des bases de données ",
                "key"=>"M106",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>1,
                "title"=>" Développer des sites web dynamiques ",
                "key"=>"M107",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>1,
                "title"=>" S’initier à la sécurité des systèmes d’information ",
                "key"=>"M108",
                "duration"=>50,
                "coefficient"=>1
            ],

            [
                "option_id"=>2,
                "title"=>"Préparation d’un projet web",
                "key"=>"M201",
                "duration"=>60,
                "coefficient"=>1
            ],
            [
                "option_id"=>2,
                "title"=>"Approche agile",
                "key"=>"M202",
                "duration"=>120,
                "coefficient"=>2
            ],
            [
                "option_id"=>2,
                "title"=>"Gestion des données",
                "key"=>"M203",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>2,
                "title"=>"Développement front-end",
                "key"=>"M204",
                "duration"=>90,
                "coefficient"=>3
            ],
            [
                "option_id"=>2,
                "title"=>"Développement back-end",
                "key"=>"M205",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>2,
                "title"=>"Création d’une application Cloud native",
                "key"=>"M206",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>2,
                "title"=>"Projet de synthèse",
                "key"=>"M207",
                "duration"=>60,
                "coefficient"=>2
            ],
            [
                "option_id"=>2,
                "title"=>"Intégration du milieu professionnel",
                "key"=>"M208",
                "duration"=>160,
                "coefficient"=>2
            ],

            [
                "option_id"=>3,
                "title"=>"Bases du développement Android",
                "key"=>"M201",
                "duration"=>100,
                "coefficient"=>3
            ],
            [
                "option_id"=>3,
                "title"=>"Programmation KOTLIN",
                "key"=>"M202",
                "duration"=>100,
                "coefficient"=>3
            ],
            [
                "option_id"=>3,
                "title"=>"Gestion de projet ",
                "key"=>"M203",
                "duration"=>45,
                "coefficient"=>1
            ],
            [
                "option_id"=>3,
                "title"=>"Initiation aux composants et modèle d’une application Android ",
                "key"=>"M204",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>3,
                "title"=>"Développement des interfaces utilisateurs sous Android ",
                "key"=>"M205",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>3,
                "title"=>"Elaboration d’une application Android sécurisée ",
                "key"=>"M206",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>3,
                "title"=>"Développement des applications IOS ",
                "key"=>"M207",
                "duration"=>90,
                "coefficient"=>3
            ],
            [
                "option_id"=>3,
                "title"=>"Développement multiplateforme ",
                "key"=>"M208",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>3,
                "title"=>"Intégration du milieu professionnel",
                "key"=>"M209",
                "duration"=>160,
                "coefficient"=>2
            ],



            [
                "option_id"=>4,
                "title"=>"Métier et Formation dans le secteur AGC",
                "key"=>"M101",
                "duration"=>100,
                "coefficient"=>2
            ],
            [
                "option_id"=>4,
                "title"=>"Bureautique",
                "key"=>"M102",
                "duration"=>90,
                "coefficient"=>1
            ],
            [
                "option_id"=>4,
                "title"=>"L’entreprise et son environnement",
                "key"=>"M103",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>4,
                "title"=>"Statistiques",
                "key"=>"M104",
                "duration"=>160,
                "coefficient"=>4
            ],
            [
                "option_id"=>4,
                "title"=>"Comptabilité générale : les concepts de base",
                "key"=>"M105",
                "duration"=>120,
                "coefficient"=>3
            ],
            [
                "option_id"=>4,
                "title"=>"Marketing",
                "key"=>"M106",
                "duration"=>160,
                "coefficient"=>2
            ],
            [
                "option_id"=>4,
                "title"=>"Comptabilité générale : les opérations courantes",
                "key"=>"M107",
                "duration"=>110,
                "coefficient"=>3
            ],
            [
                "option_id"=>4,
                "title"=>"Traitement des salaires",
                "key"=>"M108",
                "duration"=>90,
                "coefficient"=>2
            ],
            [
                "option_id"=>4,
                "title"=>"Logiciel de gestion commerciale, comptable et de paie",
                "key"=>"M109",
                "duration"=>100,
                "coefficient"=>3
            ],
            [
                "option_id"=>4,
                "title"=>"Comptabilité générale : les écritures d’inventaire et de régularisation",
                "key"=>"M110",
                "duration"=>80,
                "coefficient"=>4
            ],
            
        
        ]);
      
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
