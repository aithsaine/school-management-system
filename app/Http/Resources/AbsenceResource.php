<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AbsenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "assignement"=>$this->affectation->id,
            "student"=>$this->student->id,
            "date"=>$this->date,
            "motif"=>$this->motif
        ];
    }
}
