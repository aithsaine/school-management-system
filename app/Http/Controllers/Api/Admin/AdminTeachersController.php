<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminTeachersController extends Controller
{
    //
    public function store(Request $request)
    {
        try {

            User::validate($request);
        } catch (ValidationException $er) {
            return response($er->errors(), 422);
        }
        $cleanFname = implode('', explode(" ", trim($request->first_name)));
        $cleanLname = implode('', explode(" ", trim($request->last_name)));
        $userEmails = User::all(["email"])->toArray();
        if (in_array($cleanFname . "." . $cleanLname . "@ofppt-edu.ma", $userEmails)) {
            return response(["message" => "email already exist"], 422);
        }
        $user = new User();
        $user->cin = $request->cin;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $cleanFname . "." . $cleanLname . "@ofppt-edu.ma";
        $user->password = Hash::make("P@ssw0rd");
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->adress = $request->adress;
        $user->tele = $request->tele;
        $user->save();
        $formateur = new Teacher();
        $formateur->user_id = $user->id;
        $formateur->save();
        return response(["status" => 200, "teachers" => TeacherResource::collection(Teacher::all()), "message" => "le formateur est ajouter avec success"]);
    }
}
