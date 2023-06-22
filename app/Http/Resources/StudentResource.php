<?php

namespace App\Http\Resources;

use App\Models\Admin;
use Carbon\Carbon;
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
            "id"=>$this->id,
            "student_number" => $this->student_number,
            "first_name" => $this->user->first_name,
            "last_name" => $this->user->last_name,
            "cin" => $this->user->cin,
            "adress" => $this->user->adress,
            "gender" => $this->user->gender,
            "birthday" => $this->user->birthday,
            "hiring_date"=>Carbon::parse($this->user->created_at)->format("F Y"),
            "tele" => $this->user->tele,
            "email" => $this->user->email,
            "role" => "student",
            "group" => $this->group->id,
        ];
    }
}
