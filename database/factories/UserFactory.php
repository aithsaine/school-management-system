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
        return [
            "cin" => Str::random(5),
            'first_name' => fake()->firstName,
            'last_name' => fake()->lastName,
            "gender" => "male",
            "tele" => fake()->phoneNumber,
            "adress" => fake()->address,
            "birthday" => fake()->date,
            'email' => fake()->safeEmail(),
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
