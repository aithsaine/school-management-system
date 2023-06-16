<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "assignement"=>$this->affectation_id,
            "student"=>$this->student_id,
            "note"=>$this->note,
            "control"=>$this->control_number
        ];
    }
}
