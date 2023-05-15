<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "first_name" => $this->user->first_name,
            "last_name" => $this->user->last_name,
            "cin" => $this->user->cin,
            "adress" => $this->user->adress,
            "gender" => $this->user->gender,
            "birthday" => $this->user->birthday,
            "tele" => $this->user->tele,
            "email" => $this->user->email,
            "role" => "teacher",
        ];;
    }
}
