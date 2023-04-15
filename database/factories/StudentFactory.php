<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "student_number" => Str::random(8),
            "user_id" => \App\Models\User::factory()->create()->id,
            "registration_date" => Carbon::yesterday(),
            'group_id' => \App\Models\Group::all()->random()->id,
            'branch_id' => \App\Models\Branch::all()->random()->id,
            'level_id' => \App\Models\Level::all()->random()->id
        ];
    }
}
