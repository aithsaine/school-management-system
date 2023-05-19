<?php

namespace App\Http\Resources;

use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $role = "";
        if (Admin::where("user_id", $this->id)->exists()) {
            $role = "admin";
        } elseif (Teacher::where("user_id", $this->id)->exists()) {
            $role = "teacher";
        } elseif (Student::where("user_id", $this->id)->exists()) {
            $role = "student";
        }
        return [
            "id"=>$this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "cin" => $this->cin,
            "adress" => $this->adress,
            "gender" => $this->gender,
            "birthday" => $this->birthday,
            "tele" => $this->tele,
            "email" => $this->email,
            "hiring_date"=>$this->created_at->format("F, d Y"),
            "role" => $role
        ];
    }
}
