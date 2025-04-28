<?php

namespace App\Http\Controllers;

use App\Models\Voyage;
use Illuminate\Http\Request;

class VoyageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $voyages=Voyage::all();
            return response()->json($voyages);
            } catch (\Exception $e) {
            return response()->json("probleme de récupération de la liste des voyages");
            }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $voyage=new Voyage([
            "datevoyage"=>$request->input("datevoyage"),
            "prixplace"=>$request->input("prixplace"),
            "nbplacetotal"=>$request->input("nbplacetotal"),
            "depart"=>$request->input("depart"),
            "destination"=>$request->input("destination")
            ]);
            $voyage->save();
            return response()->json($voyage);
        } catch (\Exception $e) {
            return response()->json("insertion impossible");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $voyage=Voyage::findOrFail($id);
            return response()->json($voyage);
            } catch (\Exception $e) {
            return response()->json("probleme de récupération des données");
            }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        try {
            $voyage=Voyage::findorFail($id);
            $voyage->update($request->all());
            return response()->json($voyage);
            } catch (\Exception $e) {
            return response()->json("probleme de modification");
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $voyage=Voyage::findOrFail($id);
            $voyage->delete();
            return response()->json("catégorie supprimée avec succes");
            } catch (\Exception $e) {
            return response()->json("probleme de suppression de catégorie");
            }
            }
}

