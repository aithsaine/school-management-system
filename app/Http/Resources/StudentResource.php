<?php

namespace App\Http\Resources;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            "student_number" => $this->student_number,
            "first_name" => $this->user->first_name,
            "last_name" => $this->user->last_name,
            "cin" => $this->user->cin,
            "adress" => $this->user->adress,
            "gender" => $this->user->gender,
            "birthday" => $this->user->birthday,
            "tele" => $this->user->tele,
            "email" => $this->user->email,
            "role" => "student"
        ];
    }
}
