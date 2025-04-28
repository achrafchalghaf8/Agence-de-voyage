<?php

use App\Http\Controllers\DestinationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoyageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
    ], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refreshToken', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    });
    Route::get('users/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');


Route::middleware('api')->group(function () {
    Route::resource('voyages', VoyageController::class);
    });
    Route::get('reservations/somme-places/{idVoyage}', [ReservationController::class, 'sommePlaces']);

    // Route::group(['middleware' => ['auth:api']], function () {
    //     Route::resource('voyages', VoyageController::class);
    //     });

        Route::group(['middleware' => ['auth:api']], function () {
            Route::resource('reservations/somme-places/{idVoyage}', ReservationController::class);
            });
    

    
    // Route::get('destinations', [DestinationController::class, 'index']);  // Récupérer tous les utilisateurs
    // Route::get('destinations/{id}', [DestinationController::class, 'show']);  // Afficher un utilisateur spécifique
    // Route::post('destinations', [DestinationController::class, 'store']);  // Créer un nouvel utilisateur
    // Route::put('destinations/{id}', [DestinationController::class, 'update']);  // Mettre à jour un utilisateur
    // Route::delete('destinations/{id}', [DestinationController::class, 'destroy']);

    Route::group(['middleware' => ['auth:api']], function () {
        Route::resource('destinations', DestinationController::class);
        });
    
    
// Route::get('users', [UserController::class, 'index']);  // Récupérer tous les utilisateurs
// Route::get('users/{id}', [UserController::class, 'show']);  // Afficher un utilisateur spécifique
// Route::post('users', [UserController::class, 'store']);  // Créer un nouvel utilisateur
// Route::put('users/{id}', [UserController::class, 'update']);  // Mettre à jour un utilisateur
// Route::delete('users/{id}', [UserController::class, 'destroy']);
   

Route::group(['middleware' => ['auth:api']], function () {
    Route::resource('users', UserController::class);
    });

// Route::middleware('api')->group(function () {
    //     Route::resource('reservations', ReservationController::class);
    //     });
        Route::group(['middleware' => ['auth:api']], function () {
            Route::resource('reservations', ReservationController::class);
            });




    