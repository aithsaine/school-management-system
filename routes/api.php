<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(["auth:sanctum"])->get('/user', function (Request $request) {
    return  new UserResource($request->user());
});
Route::controller(App\Http\Controllers\Api\AdminStudentController::class)->group(function () {
    Route::get("/admin/info", "info");
    Route::post("/admin/student/store", "store");
    Route::get("/admin/students/filter", "filtreStudents");
    Route::patch("/admin/student/update", "update");
});
Route::controller(AuthenticationController::class)->group(function () {
    Route::post("login", "login");
    Route::post("logout", "logout")->middleware("auth:sanctum");
});
