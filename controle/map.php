<?php
function connexion() { 

    $nom=  strip_tags(isset($_POST['nom'])?($_POST['nom']):'');
    $mdp=  strip_tags(isset($_POST['mdp'])?($_POST['mdp']):'');
    $cleanmdp = crypt(md5($mdp),md5($nom)); // crypter les mods de passe
    $msg='';
    
    if (count($_POST)==0){
        require("./vue/connexion.tpl");
    }else{
        require("./modele/connexionBD.php");
        $profil = array();
        if  (!verif_connexion($nom,$cleanmdp,$profil)) {
            $msg ="erreur de saisie";
            require ("./vue/connexion.tpl");
        }
        else { 
            $_SESSION['profil'] = $profil;
            $id = $_SESSION['profil']['idPers'];
            $url = "index.php?controle=map&action=map&id=$id";
            header("Location:" . $url) ;
        }
    }	
}

function map(){
    if (isset($_SESSION['profil'])) {
       
        $nom = $_SESSION['profil']['nom'];
        $id=$_GET['id'];

        // $infoIdF = array();
        // $ListFacturationEntrep = array();
        // $tempsRelle = date('Y/m/d',time()); // temps actuel en estampilles

        require('./vue/map.html');
    }
}

    // $dep=isset($_POST['depart'])?($_POST['depart']):'';
    // $arr=isset($_POST['arrivee'])?($_POST['arrivee']):'';

    // if(count($_POST)==0){
    //     require("index.html");
    // }else{
    //     $address = rawurlencode( $address );
    //     $url  = 'http://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=' . $address . '&format=json&limit=1';
    //     $json = wp_remote_get( $url );
    //      $coord['lat']  = $json[0]['lat'];
	// 	 $coord['long'] = $json[0]['lon'];


    //     return $json;
    //}
 ?>

