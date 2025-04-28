<?php
namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Descriptor\Descriptor;

class DestinationController extends Controller
{
    /**
     * Afficher la liste des destinations.
     */
    public function index()
    {
        try {
            $destinations = Destination::all();
            return response()->json($destinations);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Problème de récupération des destinations'], 500);
        }
    }

    /**
     * Créer une nouvelle destination.
     */
    public function store(Request $request)
    {
        try {
            $destination=new Destination([
            "nom"=>$request->input("nom"),
            "description"=>$request->input("description"),
            "image"=>$request->input("image"),
            ]);
            $destination->save();
            return response()->json($destination);
        } catch (\Exception $e) {
            return response()->json("insertion impossible");
        }
    }
    /**
     * Afficher une destination spécifique.
     */
    public function show($id)
    {
        try {
            $destination = Destination::findOrFail($id);
            return response()->json($destination);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Problème de récupération des données'], 500);
        }
    }

    /**
     * Mettre à jour une destination spécifique.
     */
    public function update(Request $request,$id)
    {
        try {
            $destination=Destination::findorFail($id);
            $destination->update($request->all());
            return response()->json($destination);
            } catch (\Exception $e) {
            return response()->json("probleme de modification");
            }
    }
    /**
     * Supprimer une destination.
     */
    public function destroy($id)
    {
        try {
            $destination=Destination::findOrFail($id);
            $destination->delete();
            return response()->json("destination supprimée avec succes");
            } catch (\Exception $e) {
            return response()->json("probleme de suppression de destination");
            }
            }
}
