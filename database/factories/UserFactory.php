<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fname = fake()->firstName;
        $lname = fake()->lastName;
        return [
            "cin" => "JH" . fake()->numberBetween(11000, 999999),
            'first_name' => $fname,
            'last_name' => $lname,
            "gender" => "male",
            "tele" => fake()->phoneNumber,
            "adress" => fake()->address,
            "birthday" => fake()->date,
            'email' => $fname . "." . $lname . "@ofppt-edu.ma",
            'email_verified_at' => now(),
            'password' => Hash::make('adminadmin'), // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
