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
        App\Models\Option::insert([
            [
                "branch_id"=>1,
                "name"=>"trunc comun",
                "season"=>1,
                "key"=>"TC"
            ],
            [
                "branch_id"=>1,
                "name"=>"Web Full Stack",
                "season"=>2,
                "key"=>"WFS"
            ],
            [
                "branch_id"=>1,
                "name"=>"Applications Mobiles",
                "season"=>2,
                "key"=>"AM"
            ],
            [
                "branch_id"=>2,
                "name"=>"trunc comun",
                "season"=>1,
                "key"=>"TC"
            ],
            [
                "branch_id"=>2,
                "name"=>"Commerce et Marketing",
                "season"=>2,
                "key"=>"CM"
            ],
            [
                "branch_id"=>2,
                "name"=>"Ressources Humaines ",
                "season"=>2,
                "key"=>"RH"
            ],
            [
                "branch_id"=>3,
                "name"=>"trunc comun",
                "season"=>1,
                "key"=>"TC"
            ],
            [
                "branch_id"=>3,
                "name"=>"Laboratoire BTP",
                "season"=>2,
                "key"=>"LBTP"
            ],
            [
                "branch_id"=>3,
                "name"=>"méthodes en BTP",
                "season"=>2,
                "key"=>"MBTP"
            ],
            [
                "branch_id"=>3,
                "name"=>"Travaux Publics",
                "season"=>2,
                "key"=>"TP"
            ],
            [
                "branch_id"=>4,
                "name"=>"trunc comun",
                "season"=>1,
                "key"=>"TC"
            ],
            [
                "branch_id"=>4,
                "name"=>"Projecteur En Batiment",
                "season"=>2,
                "key"=>"PB"
            ],
            [
                "branch_id"=>5,
                "name"=>"trunc comun",
                "season"=>1,
                "key"=>"TC"
            ],
            [
                "branch_id"=>5,
                "name"=>"comptabilité",
                "season"=>2,
                "key"=>"C"
            ],
            
            
        ]);
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_options');
    }
};
