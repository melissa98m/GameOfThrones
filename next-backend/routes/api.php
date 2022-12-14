<?php

use App\Http\Controllers\API\FamilleController;
use App\Http\Controllers\API\PersonnageController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [RegisteredUserController::class, 'register'])
    ->middleware('guest')
    ->name('register');

Route::apiResource('familles', FamilleController::class);
Route::apiResource('personnages', PersonnageController::class);
