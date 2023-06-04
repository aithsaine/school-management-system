<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;


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
Route::controller(App\Http\Controllers\Api\Admin\AdminStudentController::class)->group(function () {
    Route::get("/admin/students", "index");
    Route::post("/admin/student/store", "store");
    Route::get("/admin/students/filter", "filtreStudents");
    Route::patch("/admin/student/update", "update");
    Route::delete("/admin/student/{cin}/delete", "delete");
});
Route::controller(App\Http\Controllers\Api\AuthenticationController::class)->group(function () {
    Route::post("login", "login");
    Route::post("logout", "logout")->middleware("auth:sanctum");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminController::class)->group(function () {
    Route::get("admin/info", "info");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminBranchController::class)->group(function () {
    Route::post("/admin/branch/store", "store");
    Route::delete("/admin/branch/{id}/delete", "delete");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminTeachersController::class)->group(function () {
    Route::post("/admin/teacher/store", "store");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminGroupsController::class)->group(function(){
    Route::post("/admin/group/store","store");
    Route::delete("/admin/group/{id}/delete","delete");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminModuleController::class)->group(function(){
    Route::post("admin/module/store","store");
    Route::delete("admin/module/{id}/delete","delete");
});
Route::controller(App\Http\Controllers\Api\Admin\AdminAffectationController::class)->group(function(){
    Route::post("admin/affectaion/store","store");
    Route::patch("admin/affectaion/update","update");
    Route::delete("admin/affectaion/delete","delete");
});

Route::controller(App\Http\Controllers\Api\Teacher\TeacherController::class)->group(function()
{
  Route::get("teacher/{id}/info","info");
});
Route::controller(App\Http\Controllers\Api\Teacher\TeacherModulesController::class)->group(function(){
    Route::patch("teacher/module/start","start_module");
    Route::patch("teacher/module/end","end_module");
});


Route::controller(App\Http\Controllers\Api\Teacher\TeacherNoteController::class)->group(function()
{
    Route::get("/teacher/note/grille/download/{id}/{nbr}","grille");
});

